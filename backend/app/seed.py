# Idempotent sample-data seeding for the properties table.

from app.database import SessionLocal
from app.models.property import Property

# At least 8 realistic properties across different cities, prices and types.
SAMPLE_PROPERTIES = [
    {
        "title": "Luxury 3 BHK Apartment in Andheri West",
        "description": "Spacious 3 BHK apartment in a premium Andheri West tower "
        "with city views, modular kitchen and a large balcony.",
        "price": 18500000,
        "listing_type": "SALE",
        "property_type": "Apartment",
        "location": "Palm Grove Apartments, Linking Road",
        "city": "Mumbai",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqft": 1450,
        "image_url": None,
        "is_featured": True,
    },
    {
        "title": "Modern 2 BHK Apartment for Rent in Indiranagar",
        "description": "Well-maintained 2 BHK in a gated Indiranagar community, "
        "close to metro and cafes. Ideal for young professionals.",
        "price": 35000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "100 Feet Road, Indiranagar",
        "city": "Bangalore",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqft": 1050,
        "image_url": None,
        "is_featured": False,
    },
    {
        "title": "Stunning 4 BHK Villa in Gachibowli",
        "description": "Contemporary 4 BHK villa with private garden, home theater "
        "and double-height living room in a prime Gachibowli address.",
        "price": 42000000,
        "listing_type": "SALE",
        "property_type": "Villa",
        "location": "Pristine Enclave, Financial District",
        "city": "Hyderabad",
        "bedrooms": 4,
        "bathrooms": 4,
        "area_sqft": 3200,
        "image_url": None,
        "is_featured": True,
    },
    {
        "title": "Spacious 3 BHK Independent House in Dwarka",
        "description": "Corner 3 BHK house in a quiet Dwarka sector with park "
        "facing windows, covered parking and a dedicated study room.",
        "price": 9500000,
        "listing_type": "SALE",
        "property_type": "House",
        "location": "Sector 12, Dwarka",
        "city": "Delhi",
        "bedrooms": 3,
        "bathrooms": 3,
        "area_sqft": 1800,
        "image_url": None,
        "is_featured": False,
    },
    {
        "title": "Prime Residential Plot in Hinjewadi",
        "description": "Clear-title residential plot in a developed Hinjewadi "
        "neighbourhood with all utilities and good road access.",
        "price": 6000000,
        "listing_type": "SALE",
        "property_type": "Plot",
        "location": "Phase 1, Hinjewadi",
        "city": "Pune",
        "bedrooms": None,
        "bathrooms": None,
        "area_sqft": 2400,
        "image_url": None,
        "is_featured": False,
    },
    {
        "title": "Cozy Studio Apartment for Rent in Bandra",
        "description": "Fully furnished studio near Bandra station with "
        "high-speed internet, ideal for a single professional.",
        "price": 28000,
        "listing_type": "RENT",
        "property_type": "Studio",
        "location": "St. Andrews Road, Bandra West",
        "city": "Mumbai",
        "bedrooms": 0,
        "bathrooms": 1,
        "area_sqft": 420,
        "image_url": None,
        "is_featured": False,
    },
    {
        "title": "Spectacular Penthouse in OMR",
        "description": "Corner penthouse with panoramic sea views, private terrace, "
        "jacuzzi and premium finishes in a top OMR tower.",
        "price": 55000000,
        "listing_type": "SALE",
        "property_type": "Penthouse",
        "location": "OMR IT Corridor, Sholinganallur",
        "city": "Chennai",
        "bedrooms": 4,
        "bathrooms": 5,
        "area_sqft": 4200,
        "image_url": None,
        "is_featured": True,
    },
    {
        "title": "Beachside 3 BHK Villa for Rent in North Goa",
        "description": "Furnished 3 BHK villa a short walk from Anjuna beach with "
        "a private pool and tropical garden.",
        "price": 150000,
        "listing_type": "RENT",
        "property_type": "Villa",
        "location": "Anjuna, North Goa",
        "city": "Goa",
        "bedrooms": 3,
        "bathrooms": 3,
        "area_sqft": 2800,
        "image_url": None,
        "is_featured": True,
    },
    {
        "title": "Elegant 2 BHK Apartment in Malviya Nagar",
        "description": "Bright 2 BHK apartment in a family-friendly Malviya "
        "Nagar society with garden, clubhouse and 24x7 security.",
        "price": 4800000,
        "listing_type": "SALE",
        "property_type": "Apartment",
        "location": "Malviya Nagar, Jaipur",
        "city": "Jaipur",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqft": 980,
        "image_url": None,
        "is_featured": False,
    },
    {
        "title": "Affordable 2 BHK Apartment for Rent in Salt Lake",
        "description": "Clean 2 BHK in a central Salt Lake Sector location near "
        "offices and markets, available immediately.",
        "price": 22000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Sector V, Salt Lake",
        "city": "Kolkata",
        "bedrooms": 2,
        "bathrooms": 1,
        "area_sqft": 850,
        "image_url": None,
        "is_featured": False,
    },
]


def _img(photo_id, w=1200):
    """Build a public Unsplash image URL."""
    return (
        f"https://images.unsplash.com/photo-{photo_id}"
        f"?auto=format&fit=crop&w={w}&q=80"
    )


INDORE_PROPERTIES = [
    {
        "title": "Elegant 3 BHK Apartment in Vijay Nagar",
        "description": "Bright 3 BHK apartment in a premium Vijay Nagar tower "
        "with lake-facing views, modular kitchen and club amenities.",
        "price": 8500000,
        "listing_type": "SALE",
        "property_type": "Apartment",
        "location": "Vijay Nagar, Indore",
        "city": "Indore",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqft": 1400,
        "image_url": _img("1522708323590-d24dbb6b0267"),
        "is_featured": True,
    },
    {
        "title": "Modern 2 BHK Apartment for Rent in Nipania",
        "description": "Well-maintained 2 BHK in a gated Nipania society near "
        "the airport road, ideal for working professionals.",
        "price": 18000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Nipania, Indore",
        "city": "Indore",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqft": 1050,
        "image_url": _img("1502672260266-1c1ef2d93688"),
        "is_featured": False,
    },
    {
        "title": "Luxurious 4 BHK Villa in Super Corridor",
        "description": "Contemporary 4 BHK villa in the premium Super Corridor "
        "belt with private garden, home theater and modular interiors.",
        "price": 22500000,
        "listing_type": "SALE",
        "property_type": "Villa",
        "location": "Super Corridor, Indore",
        "city": "Indore",
        "bedrooms": 4,
        "bathrooms": 4,
        "area_sqft": 3000,
        "image_url": _img("1605146769289-440113cc3d00"),
        "is_featured": True,
    },
    {
        "title": "Residential Plot in Rau",
        "description": "Clear-title NA residential plot in Rau with wide roads, "
        "all utilities and excellent connectivity to the city.",
        "price": 4500000,
        "listing_type": "SALE",
        "property_type": "Plot",
        "location": "Rau, Indore",
        "city": "Indore",
        "bedrooms": None,
        "bathrooms": None,
        "area_sqft": 2000,
        "image_url": _img("1500382017468-9049fed747ef"),
        "is_featured": False,
    },
    {
        "title": "Spacious 3 BHK Independent House in Scheme 54",
        "description": "Well-built 3 BHK independent house in Scheme 54 with a "
        "private lawn, covered parking and a quiet neighbourhood.",
        "price": 12000000,
        "listing_type": "SALE",
        "property_type": "House",
        "location": "Scheme No. 54, Indore",
        "city": "Indore",
        "bedrooms": 3,
        "bathrooms": 3,
        "area_sqft": 1800,
        "image_url": _img("1568605114967-8130f3a36994"),
        "is_featured": False,
    },
    {
        "title": "Cozy Studio Apartment for Rent in AB Road",
        "description": "Fully furnished studio near AB Road with high-speed "
        "internet, smart storage and a dedicated work corner.",
        "price": 12000,
        "listing_type": "RENT",
        "property_type": "Studio",
        "location": "AB Road, Indore",
        "city": "Indore",
        "bedrooms": 0,
        "bathrooms": 1,
        "area_sqft": 400,
        "image_url": _img("1595526114035-0d45ed16cfbf"),
        "is_featured": False,
    },
    {
        "title": "2 BHK Apartment for Rent in Bengali Square",
        "description": "Clean 2 BHK apartment in a central Bengali Square "
        "location close to markets, schools and public transport.",
        "price": 15000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Bengali Square, Indore",
        "city": "Indore",
        "bedrooms": 2,
        "bathrooms": 1,
        "area_sqft": 900,
        "image_url": _img("1560185007-cde436f6a4d0"),
        "is_featured": False,
    },
    {
        "title": "Spacious 4 BHK Villa for Rent in Mahalaxmi Nagar",
        "description": "Furnished 4 BHK villa with a private garden and "
        "terrace in a quiet Mahalaxmi Nagar lane, ideal for a family.",
        "price": 75000,
        "listing_type": "RENT",
        "property_type": "Villa",
        "location": "Mahalaxmi Nagar, Indore",
        "city": "Indore",
        "bedrooms": 4,
        "bathrooms": 4,
        "area_sqft": 2800,
        "image_url": _img("1512917774080-9991f1c4c750"),
        "is_featured": False,
    },
    {
        "title": "Modern 3 BHK Apartment in Kanadia Road",
        "description": "Contemporary 3 BHK apartment on Kanadia Road with "
        "premium finishes, modular kitchen and 24x7 security.",
        "price": 9500000,
        "listing_type": "SALE",
        "property_type": "Apartment",
        "location": "Kanadia Road, Indore",
        "city": "Indore",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqft": 1350,
        "image_url": _img("1560448204-e02f11c3d0e2"),
        "is_featured": False,
    },
    {
        "title": "Commercial Plot for Rent in Bhawarkua",
        "description": "Strategic plot on Bhawarkua Road available for rent, "
        "suitable for a showroom or small business setup.",
        "price": 25000,
        "listing_type": "RENT",
        "property_type": "Plot",
        "location": "Bhawarkua, Indore",
        "city": "Indore",
        "bedrooms": None,
        "bathrooms": None,
        "area_sqft": 1500,
        "image_url": _img("1500382017468-9049fed747ef"),
        "is_featured": False,
    },
]

BHOPAL_PROPERTIES = [
    {
        "title": "Premium 3 BHK Apartment in Kolar Road",
        "description": "Elegant 3 BHK apartment in a gated Kolar Road "
        "community with clubhouse, gym and covered parking.",
        "price": 7200000,
        "listing_type": "SALE",
        "property_type": "Apartment",
        "location": "Kolar Road, Bhopal",
        "city": "Bhopal",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqft": 1250,
        "image_url": _img("1522708323590-d24dbb6b0267"),
        "is_featured": True,
    },
    {
        "title": "2 BHK Apartment for Rent in Arera Colony",
        "description": "Well-maintained 2 BHK in Arera Colony close to the "
        "high street and offices, available immediately.",
        "price": 14000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Arera Colony, Bhopal",
        "city": "Bhopal",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqft": 950,
        "image_url": _img("1502672260266-1c1ef2d93688"),
        "is_featured": False,
    },
    {
        "title": "Stunning 4 BHK Villa in MP Nagar",
        "description": "Modern 4 BHK villa in MP Nagar with a private pool "
        "area, garden and double-height living room.",
        "price": 18000000,
        "listing_type": "SALE",
        "property_type": "Villa",
        "location": "MP Nagar, Bhopal",
        "city": "Bhopal",
        "bedrooms": 4,
        "bathrooms": 4,
        "area_sqft": 3200,
        "image_url": _img("1605146769289-440113cc3d00"),
        "is_featured": False,
    },
    {
        "title": "Residential Plot in Hoshangabad Road",
        "description": "Clear-title residential plot on Hoshangabad Road "
        "with developed surroundings and good road access.",
        "price": 3800000,
        "listing_type": "SALE",
        "property_type": "Plot",
        "location": "Hoshangabad Road, Bhopal",
        "city": "Bhopal",
        "bedrooms": None,
        "bathrooms": None,
        "area_sqft": 2200,
        "image_url": _img("1500382017468-9049fed747ef"),
        "is_featured": False,
    },
    {
        "title": "Independent 3 BHK House in Bawadia Kalan",
        "description": "Solid 3 BHK independent house in a quiet Bawadia "
        "Kalan lane with a private courtyard and parking.",
        "price": 10500000,
        "listing_type": "SALE",
        "property_type": "House",
        "location": "Bawadia Kalan, Bhopal",
        "city": "Bhopal",
        "bedrooms": 3,
        "bathrooms": 3,
        "area_sqft": 1700,
        "image_url": _img("1568605114967-8130f3a36994"),
        "is_featured": False,
    },
    {
        "title": "Affordable 2 BHK Apartment for Rent in Shahpura",
        "description": "Clean 2 BHK apartment in Shahpura with good "
        "ventilation, storage and easy access to the main city.",
        "price": 13000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Shahpura, Bhopal",
        "city": "Bhopal",
        "bedrooms": 2,
        "bathrooms": 1,
        "area_sqft": 880,
        "image_url": _img("1560185007-cde436f6a4d0"),
        "is_featured": False,
    },
    {
        "title": "4 BHK Villa for Rent in Ayodhya Bypass",
        "description": "Furnished 4 BHK villa near Ayodhya Bypass with a "
        "garden, terrace and modern fittings, ideal for a family.",
        "price": 60000,
        "listing_type": "RENT",
        "property_type": "Villa",
        "location": "Ayodhya Bypass, Bhopal",
        "city": "Bhopal",
        "bedrooms": 4,
        "bathrooms": 3,
        "area_sqft": 2600,
        "image_url": _img("1512917774080-9991f1c4c750"),
        "is_featured": False,
    },
    {
        "title": "Spectacular Penthouse in Gulmohar Colony",
        "description": "Corner penthouse in Gulmohar Colony with a private "
        "terrace, panoramic views and premium finishes.",
        "price": 28000000,
        "listing_type": "SALE",
        "property_type": "Penthouse",
        "location": "Gulmohar Colony, Bhopal",
        "city": "Bhopal",
        "bedrooms": 4,
        "bathrooms": 5,
        "area_sqft": 3800,
        "image_url": _img("1600607687920-4e2a09cf159d"),
        "is_featured": True,
    },
    {
        "title": "3 BHK Apartment for Rent in Katara Hills",
        "description": "Spacious 3 BHK apartment in the scenic Katara Hills "
        "area with hill views and a peaceful setting.",
        "price": 16000,
        "listing_type": "RENT",
        "property_type": "Apartment",
        "location": "Katara Hills, Bhopal",
        "city": "Bhopal",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqft": 1300,
        "image_url": _img("1600210492486-724fe5c67fb0"),
        "is_featured": False,
    },
    {
        "title": "Compact Studio for Rent in BHEL Area",
        "description": "Furnished studio near BHEL area for a single "
        "professional, with good connectivity and amenities.",
        "price": 10000,
        "listing_type": "RENT",
        "property_type": "Studio",
        "location": "BHEL Area, Bhopal",
        "city": "Bhopal",
        "bedrooms": 0,
        "bathrooms": 1,
        "area_sqft": 380,
        "image_url": _img("1595526114035-0d45ed16cfbf"),
        "is_featured": False,
    },
]

ALL_SAMPLE_PROPERTIES = (
    SAMPLE_PROPERTIES + INDORE_PROPERTIES + BHOPAL_PROPERTIES
)


def seed_database():
    """Seed sample properties idempotently.

    Inserts only properties whose title is not already present, so running the
    application multiple times never creates duplicates and never deletes or
    overwrites existing records.
    """
    db = SessionLocal()
    try:
        existing_titles = {row[0] for row in db.query(Property.title).all()}
        added = 0
        for data in ALL_SAMPLE_PROPERTIES:
            if data["title"] in existing_titles:
                continue
            db.add(Property(**data))
            added += 1
        db.commit()
        if added:
            print(f"[seed] Inserted {added} new sample properties.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
