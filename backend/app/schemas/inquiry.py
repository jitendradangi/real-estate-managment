# Pydantic schemas for inquiries.

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class InquiryCreate(BaseModel):
    """Schema for submitting a new inquiry."""

    property_id: int | None = None
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)
    message: str = Field(..., min_length=1)


class InquiryResponse(BaseModel):
    """Schema for serializing an inquiry in API responses."""

    id: int
    property_id: int | None
    name: str
    email: str
    phone: str | None
    message: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
