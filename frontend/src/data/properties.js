// Shared constants & helpers for the frontend.
// Property records are fetched from the FastAPI backend (see src/services).
// This file intentionally contains NO mock property data.

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const FALLBACK_IMAGE = u('1600596542815-ffad4c1539a9', 1200);

// Property-type based fallback images (used when image_url is null).
const TYPE_FALLBACKS = {
  Apartment: u('1522708323590-d24dbb6b0267'),
  House: u('1568605114967-8130f3a36994'),
  Villa: u('1512917774080-9991f1c4c750'),
  Plot: u('1500382017468-9049fed747ef'),
  Penthouse: u('1600607687920-4e2a09cf159d'),
  Studio: u('1595526114035-0d45ed16cfbf'),
};

// Returns the property's image_url when present, otherwise a sensible
// type-based fallback so we never render a broken/blank image.
export const getPropertyImage = (property) =>
  property?.image_url ||
  TYPE_FALLBACKS[property?.property_type] ||
  FALLBACK_IMAGE;

export const CITIES = [
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Pune',
  'Chennai',
  'Goa',
  'Jaipur',
  'Kolkata',
  'Indore',
  'Bhopal',
];

export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Plot',
  'Penthouse',
  'Studio',
];

// Returns a clean formatted amount (e.g. "₹1.85 Cr", "₹1.5 L", "₹35,000").
// Rental components append their own "/month" suffix.
export const formatPrice = (price) => {
  const inCr = price >= 10000000;
  const inL = price >= 100000;
  if (inCr)
    return `₹${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 2)} Cr`;
  if (inL) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatArea = (sqft) =>
  sqft ? `${sqft.toLocaleString('en-IN')} sq.ft` : '—';
