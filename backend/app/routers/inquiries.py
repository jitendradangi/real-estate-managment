# API router for inquiry endpoints.

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inquiry import Inquiry
from app.models.property import Property
from app.schemas.inquiry import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/api/inquiries", tags=["inquiries"])


@router.post("", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
def create_inquiry(inquiry_in: InquiryCreate, db: Session = Depends(get_db)):
    """Submit a new inquiry. Verifies the referenced property exists."""
    if inquiry_in.property_id is not None:
        property_exists = (
            db.query(Property.id)
            .filter(Property.id == inquiry_in.property_id)
            .first()
        )
        if property_exists is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Property not found",
            )

    db_inquiry = Inquiry(**inquiry_in.model_dump())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry
