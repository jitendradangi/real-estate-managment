import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import PropertyGrid from './PropertyGrid';
import PropertyFilters from './PropertyFilters';
import { getProperties } from '../services/properties';
import './PropertyListings.css';

const DEFAULT_FILTERS = {
  city: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  sort: 'newest',
};

const PAGE_SIZE = 9;

// Build query params for GET /api/properties from current filter state.
function buildParams(filters, query, listingType, skip, limit) {
  const params = { listing_type: listingType, skip, limit };
  if (filters.city) params.city = filters.city;
  if (filters.propertyType) params.property_type = filters.propertyType;
  if (filters.minPrice !== '') params.min_price = Number(filters.minPrice);
  if (filters.maxPrice !== '') params.max_price = Number(filters.maxPrice);
  if (filters.bedrooms !== '') {
    // '0' = Studio (exact), otherwise treat as minimum (N+)
    if (filters.bedrooms === '0') params.bedrooms = 0;
    else params.min_bedrooms = Number(filters.bedrooms);
  }
  if (query.trim()) params.search = query.trim();
  params.sort = filters.sort || 'newest';
  return params;
}

export default function PropertyListings({ listingType, title, description }) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const reqId = useRef(0);

  // Debounce the free-text search box.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  // Prefill filters from URL query params (e.g. hero search).
  useEffect(() => {
    const city = searchParams.get('city') || '';
    const propertyType = searchParams.get('property_type') || '';
    setFilters((f) => ({ ...f, city, propertyType }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPage = useCallback(
    async (skip, append) => {
      const id = ++reqId.current;
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError(null);
      try {
        const data = await getProperties(
          buildParams(filters, debouncedQuery, listingType, skip, PAGE_SIZE)
        );
        if (id !== reqId.current) return; // stale response
        setItems((prev) => (append ? [...prev, ...data] : data));
        setHasMore(data.length === PAGE_SIZE);
      } catch (e) {
        if (id !== reqId.current) return;
        setError('Failed to load properties. Please try again.');
        if (!append) setItems([]);
      } finally {
        if (id === reqId.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [filters, debouncedQuery, listingType]
  );

  // (Re)load first page whenever filters/search/listing type change.
  useEffect(() => {
    fetchPage(0, false);
  }, [fetchPage]);

  const loadMore = () => fetchPage(items.length, true);
  const retry = () => fetchPage(0, false);

  const activeFilterCount = [
    filters.city,
    filters.propertyType,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms !== '',
  ].filter(Boolean).length;

  return (
    <div className="listings container">
      <header className="listings__header">
        <span className="eyebrow">
          {listingType === 'RENT' ? 'Rental Listings' : 'Properties For Sale'}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className="listings__toolbar">
        <div className="listings__search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by location, title or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="listings__filter-toggle"
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal size={17} />
          Filters
          {activeFilterCount > 0 && (
            <span className="listings__filter-count">{activeFilterCount}</span>
          )}
        </button>
      </div>

      <div className="listings__layout">
        <div
          className={`listings__sidebar ${showFilters ? 'listings__sidebar--open' : ''}`}
        >
          <div className="listings__sidebar-head">
            <h3>Filters</h3>
            <button
              className="listings__sidebar-close"
              onClick={() => setShowFilters(false)}
            >
              <X size={20} />
            </button>
          </div>
          <PropertyFilters filters={filters} onChange={setFilters} />
        </div>
        {showFilters && (
          <div className="listings__overlay" onClick={() => setShowFilters(false)} />
        )}

        <div className="listings__results">
          {!loading && !error && (
            <div className="listings__result-count">
              Showing <strong>{items.length}</strong>{' '}
              {listingType === 'RENT' ? 'rental' : 'propert'}
              {items.length === 1 ? 'y' : 'ies'}
              {hasMore ? '+' : ''}
            </div>
          )}

          {loading && items.length === 0 ? (
            <div className="pgrid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pcard-skeleton" aria-hidden="true" />
              ))}
            </div>
          ) : error ? (
            <div className="listings__error">
              <p>{error}</p>
              <button className="btn btn-primary" onClick={retry}>
                <RefreshCw size={16} /> Try Again
              </button>
            </div>
          ) : (
            <>
              <PropertyGrid
                properties={items}
                emptyMessage="No properties match your filters. Try adjusting your search."
              />
              {hasMore && (
                <div className="listings__more">
                  <button
                    className="btn btn-outline"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
