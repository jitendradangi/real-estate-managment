# SQLAlchemy models package.
# Importing models here registers them on Base.metadata so that
# Base.metadata.create_all() creates every table.

from app.models.inquiry import Inquiry
from app.models.property import Property

__all__ = ["Property", "Inquiry"]
