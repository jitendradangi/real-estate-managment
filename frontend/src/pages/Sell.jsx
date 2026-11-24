import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, Home, KeyRound } from 'lucide-react';
import { CITIES, PROPERTY_TYPES } from '../data/properties';
import { createProperty } from '../services/properties';
import './Sell.css';

const initial = {
  title: '',
  description: '',
  price: '',
  listing_type: 'SALE',
  property_type: '',
  location: '',
  city: '',
  bedrooms: '',
  bathrooms: '',
  area_sqft: '',
  image_url: '',
};

export default function Sell() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (!form.property_type) e.property_type = 'Select property type';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.city) e.city = 'Select city';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toNum = (v) => (v === '' || v === null || v === undefined ? null : Number(v));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Map frontend form fields to the backend PropertyCreate schema.
      await createProperty({
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: Number(form.price),
        listing_type: form.listing_type, // already 'SALE' | 'RENT'
        property_type: form.property_type,
        location: form.location.trim(),
        city: form.city,
        bedrooms: toNum(form.bedrooms),
        bathrooms: toNum(form.bathrooms),
        area_sqft: toNum(form.area_sqft),
        image_url: form.image_url.trim() || null,
        is_featured: false,
      });
      setSubmitted(true);
      setForm(initial);
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setSubmitError(
        typeof detail === 'string'
          ? detail
          : 'Failed to submit property. Please check the details and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="sell container sell__success">
        <CheckCircle2 size={56} />
        <h1>Property Submitted!</h1>
        <p>
          Thank you! Your property listing has been received and will be
          reviewed by our team shortly.
        </p>
        <div className="sell__success-actions">
          <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm(initial); }}>
            List Another Property
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/buy')}>
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sell container">
      <header className="sell__header">
        <span className="eyebrow">Sell Your Property</span>
        <h1>List Your Property</h1>
        <p>
          Reach thousands of genuine buyers and tenants. Fill in the details
          below and our team will verify and publish your listing.
        </p>
      </header>

      <form className="sell__form" onSubmit={handleSubmit} noValidate>
        {/* Listing type */}
        <div className="sell__field sell__field--full">
          <label>Listing Type *</label>
          <div className="sell__toggle">
            <button
              type="button"
              className={`sell__toggle-btn ${form.listing_type === 'SALE' ? 'sell__toggle-btn--active' : ''}`}
              onClick={() => set('listing_type', 'SALE')}
            >
              <Home size={16} /> For Sale
            </button>
            <button
              type="button"
              className={`sell__toggle-btn ${form.listing_type === 'RENT' ? 'sell__toggle-btn--active' : ''}`}
              onClick={() => set('listing_type', 'RENT')}
            >
              <KeyRound size={16} /> For Rent
            </button>
          </div>
        </div>

        <div className="sell__field">
          <label>Property Title *</label>
          <input
            type="text"
            placeholder="e.g. Luxury 3 BHK Apartment in Andheri West"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
          />
          {errors.title && <span className="sell__error">{errors.title}</span>}
        </div>

        <div className="sell__field">
          <label>Price (₹) *</label>
          <input
            type="number"
            placeholder={form.listing_type === 'RENT' ? 'Monthly rent' : 'Sale price'}
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            min="0"
          />
          {errors.price && <span className="sell__error">{errors.price}</span>}
        </div>

        <div className="sell__field sell__field--full">
          <label>Description *</label>
          <textarea
            rows={4}
            placeholder="Describe your property — highlights, condition, amenities, nearby facilities..."
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
          {errors.description && <span className="sell__error">{errors.description}</span>}
        </div>

        <div className="sell__field">
          <label>Property Type *</label>
          <select value={form.property_type} onChange={(e) => set('property_type', e.target.value)}>
            <option value="">Select type</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.property_type && <span className="sell__error">{errors.property_type}</span>}
        </div>

        <div className="sell__field">
          <label>City *</label>
          <select value={form.city} onChange={(e) => set('city', e.target.value)}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <span className="sell__error">{errors.city}</span>}
        </div>

        <div className="sell__field sell__field--full">
          <label>Location / Address *</label>
          <input
            type="text"
            placeholder="e.g. Palm Grove Apartments, Linking Road"
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
          />
          {errors.location && <span className="sell__error">{errors.location}</span>}
        </div>

        <div className="sell__field">
          <label>Bedrooms</label>
          <input type="number" min="0" placeholder="e.g. 3" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} />
        </div>

        <div className="sell__field">
          <label>Bathrooms</label>
          <input type="number" min="0" placeholder="e.g. 2" value={form.bathrooms} onChange={(e) => set('bathrooms', e.target.value)} />
        </div>

        <div className="sell__field">
          <label>Area (sq.ft)</label>
          <input type="number" min="0" placeholder="e.g. 1450" value={form.area_sqft} onChange={(e) => set('area_sqft', e.target.value)} />
        </div>

        <div className="sell__field sell__field--full">
          <label>Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/property-image.jpg"
            value={form.image_url}
            onChange={(e) => set('image_url', e.target.value)}
          />
          <span className="sell__hint">Paste a direct link to your property's photo.</span>
        </div>

        <div className="sell__field sell__field--full">
          {submitError && <span className="sell__error sell__error--block">{submitError}</span>}
          <button type="submit" className="btn btn-accent btn-block sell__submit" disabled={submitting}>
            <Send size={17} /> {submitting ? 'Submitting...' : 'Submit Property'}
          </button>
        </div>
      </form>
    </div>
  );
}
