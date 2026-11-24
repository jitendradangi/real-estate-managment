# Pydantic schemas for properties.

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

# Allowed values for listing_type.
ListingType = Literal["SALE", "RENT"]


class PropertyBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = None
    price: float = Field(..., ge=0)
    listing_type: ListingType
    property_type: str = Field(..., min_length=1, max_length=50)
    location: str = Field(..., min_length=1, max_length=255)
    city: str = Field(..., min_length=1, max_length=100)
    bedrooms: int | None = Field(None, ge=0)
    bathrooms: int | None = Field(None, ge=0)
    area_sqft: float | None = Field(None, ge=0)
    image_url: str | None = Field(None, max_length=500)
    is_featured: bool = False


class PropertyCreate(PropertyBase):
    """Schema for creating a new property."""


class PropertyUpdate(BaseModel):
    """Schema for partially updating a property (all fields optional)."""

    title: str | None = Field(None, min_length=1, max_length=200)
    description: str | None = None
    price: float | None = Field(None, ge=0)
    listing_type: ListingType | None = None
    property_type: str | None = Field(None, min_length=1, max_length=50)
    location: str | None = Field(None, min_length=1, max_length=255)
    city: str | None = Field(None, min_length=1, max_length=100)
    bedrooms: int | None = Field(None, ge=0)
    bathrooms: int | None = Field(None, ge=0)
    area_sqft: float | None = Field(None, ge=0)
    image_url: str | None = Field(None, max_length=500)
    is_featured: bool | None = None


class PropertyResponse(PropertyBase):
    """Schema for serializing a property in API responses."""

    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
