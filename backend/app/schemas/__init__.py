# Pydantic schemas package.

from app.schemas.inquiry import InquiryCreate, InquiryResponse
from app.schemas.property import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate,
)

__all__ = [
    "PropertyCreate",
    "PropertyUpdate",
    "PropertyResponse",
    "InquiryCreate",
    "InquiryResponse",
]
