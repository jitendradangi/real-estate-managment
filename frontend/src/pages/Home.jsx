import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Home as HomeIcon,
  Castle,
  Map,
  Building,
  Warehouse,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Headset,
  TrendingUp,
  KeyRound,
  Handshake,
  Tag,
  Quote,
  Star,
} from 'lucide-react';
import Hero from '../components/Hero';
import PropertyGrid from '../components/PropertyGrid';
import { PROPERTY_TYPES } from '../data/properties';
import { getFeaturedProperties, getProperties } from '../services/properties';
import './Home.css';

const typeIcons = {
  Apartment: Building2,
  House: HomeIcon,
  Villa: Castle,
  Plot: Map,
  Penthouse: Building,
  Studio: Warehouse,
};

const whyUs = [
  { icon: ShieldCheck, title: 'Verified Listings', desc: 'Every property is physically verified by our team before listing.' },
  { icon: BadgeCheck, title: 'Trusted Partners', desc: 'We work with RERA-registered builders and verified owners.' },
  { icon: Headset, title: 'Dedicated Support', desc: 'End-to-end assistance from search to possession and beyond.' },
  { icon: TrendingUp, title: 'Best Prices', desc: 'Transparent pricing with zero hidden charges or commissions.' },
];

const services = [
  { icon: KeyRound, title: 'Buy Property', desc: 'Browse thousands of verified homes for sale across top cities.', to: '/buy', cta: 'Browse Properties' },
  { icon: HomeIcon, title: 'Rent Property', desc: 'Find furnished and semi-furnished rentals for every budget.', to: '/rent', cta: 'View Rentals' },
  { icon: Handshake, title: 'Sell Property', desc: 'List your property free and reach thousands of genuine buyers.', to: '/sell', cta: 'List Now' },
];

const testimonials = [
  {
    name: 'Ananya Iyer',
    role: 'Homeowner, Bangalore',
    text: 'EstateNest made buying our 2 BHK effortless. The verification process gave us complete confidence.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'Investor, Mumbai',
    text: 'As an investor, I trust their data and pricing. Closed two deals within a month of searching.',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Tenant, Pune',
    text: 'Found a beautiful villa for rent in Goa through their platform. The support team was excellent.',
    rating: 4,
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [allProps, setAllProps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [feat, all] = await Promise.all([
          getFeaturedProperties(),
          getProperties({ limit: 500 }),
        ]);
        if (cancelled) return;
        setFeatured(feat);
        setAllProps(all);
      } catch {
        if (!cancelled) setError('Failed to load featured properties.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const stats = [
    { value: '2,400+', label: 'Properties Listed' },
    { value: '15+', label: 'Cities Covered' },
    { value: '4.8/5', label: 'Average Rating' },
    { value: '10k+', label: 'Happy Customers' },
  ];

  return (
    <>
      <Hero />

      {/* Featured Properties */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Handpicked for You</span>
            <h2>Featured Properties</h2>
            <p>Explore our top-rated listings curated by our experts.</p>
          </div>
          {loading ? (
            <div className="pgrid">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="pcard-skeleton" aria-hidden="true" />
              ))}
            </div>
          ) : error ? (
            <div className="home__error">
              <p>{error}</p>
              <button className="btn btn-outline" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <PropertyGrid properties={featured} />
          )}
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/buy" className="btn btn-primary">
              View All Properties <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Browse by Category</span>
            <h2>Property Categories</h2>
            <p>Find exactly what you're looking for across every type of property.</p>
          </div>
          <div className="home__categories">
            {PROPERTY_TYPES.map((type) => {
              const Icon = typeIcons[type] || Building2;
              const count = allProps.filter((p) => p.property_type === type).length;
              return (
                <Link key={type} to={`/buy?property_type=${type}`} className="cat-card">
                  <span className="cat-card__icon"><Icon size={26} /></span>
                  <div>
                    <h4>{type}</h4>
                    <span>{count} listings</span>
                  </div>
                  <ArrowRight size={18} className="cat-card__arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why EstateNest</span>
            <h2>Why Choose Us</h2>
            <p>We combine technology with trust to deliver a superior property experience.</p>
          </div>
          <div className="home__why">
            {whyUs.map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-card__icon"><w.icon size={26} /></span>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What We Do</span>
            <h2>Our Services</h2>
            <p>End-to-end real estate services tailored to your needs.</p>
          </div>
          <div className="home__services">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <span className="service-card__icon"><s.icon size={28} /></span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <Link to={s.to} className="service-card__link">
                  {s.cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Stats */}
      <section className="section">
        <div className="container home__about">
          <div className="home__about-text">
            <span className="eyebrow">About EstateNest</span>
            <h2>Building Trust in Real Estate</h2>
            <p>
              EstateNest is a premium real estate platform dedicated to making
              property buying, renting and selling transparent and effortless.
              With verified listings, expert guidance and cutting-edge technology,
              we help thousands of families find their dream home every year.
            </p>
            <div className="home__about-stats">
              {stats.map((s) => (
                <div key={s.label} className="home__about-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn btn-outline">Learn More About Us</Link>
          </div>
          <div className="home__about-visual">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
              alt="Modern home"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real experiences from real customers across India.</p>
          </div>
          <div className="home__testimonials">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <Quote size={28} className="testimonial-card__quote" />
                <div className="testimonial-card__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < t.rating ? 'filled' : ''} />
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section home__cta">
        <div className="container">
          <div className="home__cta-box">
            <div>
              <h2>Ready to Find Your Dream Home?</h2>
              <p>Join thousands of happy customers. List your property or start browsing today.</p>
            </div>
            <div className="home__cta-actions">
              <Link to="/buy" className="btn btn-white">Browse Properties</Link>
              <Link to="/sell" className="btn btn-accent"><Tag size={16} /> List Your Property</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
