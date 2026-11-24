# SQLAlchemy ORM model for properties.

from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    # "SALE" or "RENT" (validated at the schema layer).
    listing_type = Column(String(10), nullable=False, index=True)
    # Apartment, House, Villa, Plot, Penthouse, etc.
    property_type = Column(String(50), nullable=False, index=True)
    location = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False, index=True)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    area_sqft = Column(Float, nullable=True)
    image_url = Column(String(500), nullable=True)
    is_featured = Column(
        Boolean, nullable=False, default=False, server_default="0", index=True
    )
    created_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc).replace(tzinfo=None),
        server_default=func.now(),
    )

    inquiries = relationship("Inquiry", back_populates="property")
