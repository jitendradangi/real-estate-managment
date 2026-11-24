import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

export default function PropertyGrid({ properties, emptyMessage = 'No properties found.' }) {
  if (!properties || properties.length === 0) {
    return <div className="pgrid__empty">{emptyMessage}</div>;
  }
  return (
    <div className="pgrid">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
