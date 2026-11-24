import { CITIES, PROPERTY_TYPES } from '../data/properties';
import './PropertyFilters.css';

const BEDROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '0', label: 'Studio' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'area_desc', label: 'Largest Area' },
];

export default function PropertyFilters({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  const clearAll = () =>
    onChange({ city: '', propertyType: '', minPrice: '', maxPrice: '', bedrooms: '', sort: 'newest' });

  return (
    <aside className="filters">
      <div className="filters__header">
        <h3>Filters</h3>
        <button className="filters__clear" onClick={clearAll}>Clear All</button>
      </div>

      <div className="filters__group">
        <label>City</label>
        <select value={filters.city} onChange={(e) => set('city', e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label>Property Type</label>
        <select value={filters.propertyType} onChange={(e) => set('propertyType', e.target.value)}>
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label>Bedrooms</label>
        <select value={filters.bedrooms} onChange={(e) => set('bedrooms', e.target.value)}>
          {BEDROOM_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label>Price Range (₹)</label>
        <div className="filters__price">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => set('minPrice', e.target.value)}
            min="0"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => set('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="filters__group">
        <label>Sort By</label>
        <select value={filters.sort} onChange={(e) => set('sort', e.target.value)}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
