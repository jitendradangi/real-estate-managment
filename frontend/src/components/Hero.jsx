import SearchBar from './SearchBar';
import './Hero.css';

const HERO_IMG =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="hero__overlay" />

      <div className="container hero__content">
        <span className="hero__eyebrow">Premium Real Estate Marketplace</span>
        <h1 className="hero__title">
          Find Your Perfect Place to <span>Call Home</span>
        </h1>
        <p className="hero__subtitle">
          Discover thousands of verified homes, villas and plots across India's
          most desirable neighbourhoods. Buy, rent or sell with confidence.
        </p>

        <div className="hero__search">
          <SearchBar />
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <strong>2,400+</strong>
            <span>Properties Listed</span>
          </div>
          <div className="hero__stat">
            <strong>850+</strong>
            <span>Cities Covered</span>
          </div>
          <div className="hero__stat">
            <strong>98%</strong>
            <span>Customer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
