import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Building2,
  Phone,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Tag,
} from 'lucide-react';
import PropertyGrid from '../components/PropertyGrid';
import InquiryForm from '../components/InquiryForm';
import WhatsAppButton from '../components/WhatsAppButton';
import { formatPrice, formatArea, getPropertyImage, FALLBACK_IMAGE } from '../data/properties';
import { getPropertyById, getProperties } from '../services/properties';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  // Load the property by id.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setProperty(null);
    (async () => {
      try {
        const data = await getPropertyById(id);
        if (!cancelled) setProperty(data);
      } catch (e) {
        if (!cancelled) {
          if (e?.response?.status === 404) setNotFound(true);
          else setNotFound(true); // treat any load failure as not found
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  // Load similar properties once the main property is known.
  useEffect(() => {
    if (!property) return;
    let cancelled = false;
    (async () => {
      try {
        const all = await getProperties({ limit: 100 });
        if (cancelled) return;
        const sims = all
          .filter(
            (p) =>
              p.id !== property.id &&
              (p.city === property.city || p.property_type === property.property_type)
          )
          .slice(0, 3);
        setSimilar(sims);
      } catch {
        if (!cancelled) setSimilar([]);
      }
    })();
    return () => { cancelled = true; };
  }, [property]);

  const handleImgError = (e) => {
    if (e.currentTarget.src !== FALLBACK_IMAGE) e.currentTarget.src = FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div className="pdetails container">
        <div className="pdetails__gallery">
          <div className="pcard-skeleton" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-lg)' }} />
        </div>
        <div className="pgrid" style={{ marginTop: 24 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pcard-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div className="pdetails container">
        <div className="pdetails__error">
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
            Property Not Found
          </h1>
          <p>The property you're looking for doesn't exist or may have been removed.</p>
          <Link to="/buy" className="btn btn-primary">
            <ArrowLeft size={16} /> Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const gallery = [getPropertyImage(property)];
  const priceLabel = formatPrice(property.price);
  const agentPhone = '917067733768';

  return (
    <div className="pdetails container">
      <Link to={property.listing_type === 'RENT' ? '/rent' : '/buy'} className="pdetails__back">
        <ArrowLeft size={16} /> Back to {property.listing_type === 'RENT' ? 'Rentals' : 'Properties'}
      </Link>

      {/* Gallery */}
      <div className="pdetails__gallery">
        <div className="pdetails__main-img">
          <img src={gallery[activeImg]} alt={property.title} onError={handleImgError} />
          <div className="pdetails__badges">
            <span className={`pcard__badge pcard__badge--${property.listing_type.toLowerCase()}`}>
              {property.listing_type}
            </span>
            {property.is_featured && (
              <span className="pcard__badge pcard__badge--featured">Featured</span>
            )}
          </div>
          {gallery.length > 1 && (
            <>
              <button
                className="pdetails__nav pdetails__nav--prev"
                onClick={() => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="pdetails__nav pdetails__nav--next"
                onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="pdetails__thumbs">
            {gallery.map((src, i) => (
              <button
                key={i}
                className={`pdetails__thumb ${i === activeImg ? 'pdetails__thumb--active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt="" onError={handleImgError} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdetails__layout">
        {/* Main content */}
        <div className="pdetails__main">
          <div className="pdetails__head">
            <h1>{property.title}</h1>
            <div className="pdetails__price">
              {priceLabel}
              {property.listing_type === 'RENT' && <span className="pdetails__per">/month</span>}
            </div>
            <p className="pdetails__location">
              <MapPin size={17} /> {property.location}, {property.city}
            </p>
          </div>

          {/* Specs */}
          <div className="pdetails__specs">
            <div className="spec">
              <BedDouble size={22} />
              <div className="spec-value"><strong>{property.bedrooms ?? '—'}</strong><span>Beds</span></div>
            </div>
            <div className="spec">
              <Bath size={22} />
              <div className="spec-value"><strong>{property.bathrooms ?? '—'}</strong><span>Baths</span></div>
            </div>
            <div className="spec">
              <Ruler size={22} />
              <div className="spec-value"><strong>{property.area_sqft ? property.area_sqft.toLocaleString('en-IN') : '—'}</strong><span>Sq.ft</span></div>
            </div>
            <div className="spec">
              <Building2 size={22} />
              <div className="spec-value"><strong>{property.property_type}</strong><span>Type</span></div>
            </div>
            <div className="spec">
              <Tag size={22} />
              <div className="spec-value"><strong>{property.listing_type}</strong><span>Listing</span></div>
            </div>
            <div className="spec">
              <Calendar size={22} />
              <div className="spec-value"><strong>{new Date(property.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong><span>Listed</span></div>
            </div>
          </div>

          {/* Description */}
          <section className="pdetails__section">
            <h2>Description</h2>
            <p>{property.description || 'No description provided.'}</p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="pdetails__sidebar">
          <div className="agent-card">
            <h3>Contact Agent</h3>
            <p>Have questions about this property? Our agent will get back to you.</p>

            <InquiryForm property={property} />

            <div className="agent-card__actions">
              <a href={`tel:+${agentPhone}`} className="btn btn-primary btn-block">
                <Phone size={17} /> Call Now
              </a>
              <WhatsAppButton
                phone={agentPhone}
                message={`Hi, I'm interested in "${property.title}" (${formatArea(property.area_sqft)}). Please share more details.`}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="pdetails__similar">
          <div className="section-heading">
            <span className="eyebrow">You May Also Like</span>
            <h2>Similar Properties</h2>
          </div>
          <PropertyGrid properties={similar} />
        </section>
      )}
    </div>
  );
}
