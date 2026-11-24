# API router for property endpoints.

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.property import Property
from app.schemas.property import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate,
)

router = APIRouter(prefix="/api/properties", tags=["properties"])


@router.get("", response_model=list[PropertyResponse])
def list_properties(
    listing_type: str | None = Query(None, description="SALE or RENT"),
    city: str | None = Query(None, description="Filter by city (case-insensitive)"),
    property_type: str | None = Query(None, description="Filter by property type"),
    min_price: float | None = Query(None, ge=0, description="Minimum price"),
    max_price: float | None = Query(None, ge=0, description="Maximum price"),
    bedrooms: int | None = Query(None, ge=0, description="Exact bedroom count"),
    min_bedrooms: int | None = Query(
        None, ge=0, description="Minimum bedroom count (e.g. 2 means 2+)"
    ),
    search: str | None = Query(
        None, description="Free-text search across title, location and city"
    ),
    sort: str | None = Query(
        None,
        description="Sort order: newest, price_asc, price_desc, area_desc",
    ),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=500, description="Max records to return"),
    db: Session = Depends(get_db),
):
    """List properties with optional filters and pagination."""
    query = db.query(Property)

    if listing_type:
        query = query.filter(
            func.upper(Property.listing_type) == listing_type.strip().upper()
        )
    if city:
        query = query.filter(func.lower(Property.city) == city.strip().lower())
    if property_type:
        query = query.filter(
            func.lower(Property.property_type) == property_type.strip().lower()
        )
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
    if bedrooms is not None:
        query = query.filter(Property.bedrooms == bedrooms)
    if min_bedrooms is not None:
        query = query.filter(Property.bedrooms >= min_bedrooms)
    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Property.title.ilike(term),
                Property.location.ilike(term),
                Property.city.ilike(term),
            )
        )

    # Sorting (default: newest first).
    sort_map = {
        "newest": Property.created_at.desc(),
        "price_asc": Property.price.asc(),
        "price_desc": Property.price.desc(),
        "area_desc": Property.area_sqft.desc(),
    }
    order_by = sort_map.get((sort or "").strip().lower(), Property.created_at.desc())

    return (
        query.order_by(order_by)
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/featured", response_model=list[PropertyResponse])
def featured_properties(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
):
    """List featured properties."""
    return (
        db.query(Property)
        .filter(Property.is_featured.is_(True))
        .order_by(Property.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int, db: Session = Depends(get_db)):
    """Get a single property by ID."""
    property = db.query(Property).filter(Property.id == property_id).first()
    if property is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Property not found"
        )
    return property


@router.post("", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
def create_property(property_in: PropertyCreate, db: Session = Depends(get_db)):
    """Create a new property."""
    db_property = Property(**property_in.model_dump())
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int, property_in: PropertyUpdate, db: Session = Depends(get_db)
):
    """Partially update an existing property."""
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Property not found"
        )

    update_data = property_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_property, field, value)

    db.commit()
    db.refresh(db_property)
    return db_property


@router.delete("/{property_id}")
def delete_property(property_id: int, db: Session = Depends(get_db)):
    """Delete a property by ID."""
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Property not found"
        )

    db.delete(db_property)
    db.commit()
    return {"message": "Property deleted successfully"}
