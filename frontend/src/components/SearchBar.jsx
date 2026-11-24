import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Home, KeyRound } from 'lucide-react';
import { CITIES, PROPERTY_TYPES } from '../data/properties';
import './SearchBar.css';

export default function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('SALE'); // SALE | RENT
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('city', location);
    if (propertyType) params.set('property_type', propertyType);
    const target = mode === 'RENT' ? '/rent' : '/buy';
    navigate(`${target}?${params.toString()}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      {/* Mode toggle */}
      <div className="searchbar__mode">
        <button
          type="button"
          className={`searchbar__mode-btn ${mode === 'SALE' ? 'searchbar__mode-btn--active' : ''}`}
          onClick={() => setMode('SALE')}
        >
          <Home size={16} /> Buy
        </button>
        <button
          type="button"
          className={`searchbar__mode-btn ${mode === 'RENT' ? 'searchbar__mode-btn--active' : ''}`}
          onClick={() => setMode('RENT')}
        >
          <KeyRound size={16} /> Rent
        </button>
      </div>

      <div className="searchbar__fields">
        <label className="searchbar__field">
          <MapPin size={18} className="searchbar__icon" />
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Location</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="searchbar__field">
          <Home size={18} className="searchbar__icon" />
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">Property Type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="searchbar__submit">
          <Search size={18} /> Search
        </button>
      </div>
    </form>
  );
}
