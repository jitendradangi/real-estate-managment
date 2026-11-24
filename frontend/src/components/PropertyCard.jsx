import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Ruler, Heart, ArrowRight } from 'lucide-react';
import { FALLBACK_IMAGE, formatPrice, formatArea, getPropertyImage } from '../data/properties';
import './PropertyCard.css';

export default function PropertyCard({ property }) {
  const imageSrc = getPropertyImage(property);
  const handleImgError = (e) => {
    if (e.currentTarget.src !== FALLBACK_IMAGE) {
      e.currentTarget.src = FALLBACK_IMAGE;
    }
  };

  const priceLabel = formatPrice(property.price, property.listing_type);

  return (
    <article className="pcard">
      <Link to={`/property/${property.id}`} className="pcard__media">
        <img
          src={imageSrc}
          alt={property.title}
          loading="lazy"
          onError={handleImgError}
        />
        <div className="pcard__badges">
          <span className={`pcard__badge pcard__badge--${property.listing_type.toLowerCase()}`}>
            {property.listing_type}
          </span>
          {property.is_featured && (
            <span className="pcard__badge pcard__badge--featured">Featured</span>
          )}
        </div>
        <button
          className="pcard__fav"
          aria-label="Save to favorites"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={18} />
        </button>
      </Link>

      <div className="pcard__body">
        <div className="pcard__price-row">
          <span className="pcard__price">{priceLabel}</span>
          {property.listing_type === 'RENT' && (
            <span className="pcard__per">/month</span>
          )}
        </div>
        <h3 className="pcard__title">{property.title}</h3>

        <p className="pcard__location">
          <MapPin size={15} /> {property.location}, {property.city}
        </p>

        <div className="pcard__meta">
          {property.bedrooms !== null && (
            <span><BedDouble size={15} /> {property.bedrooms} Bed</span>
          )}
          {property.bathrooms !== null && (
            <span><Bath size={15} /> {property.bathrooms} Bath</span>
          )}
          {property.area_sqft && (
            <span><Ruler size={15} /> {formatArea(property.area_sqft)}</span>
          )}
        </div>

        <Link to={`/property/${property.id}`} className="pcard__cta">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
