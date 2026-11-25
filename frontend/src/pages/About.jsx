import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  BadgeCheck,
  Headset,
  TrendingUp,
  Target,
  Eye,
  ArrowRight,
} from 'lucide-react';
import './About.css';

const stats = [
  { value: '15+', label: 'Cities Covered' },
  { value: '10k+', label: 'Properties Listed' },
  { value: '8k+', label: 'Happy Customers' },
  { value: '4.8/5', label: 'Average Rating' },
];

const values = [
  { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Every listing is verified. No hidden charges, no surprises.' },
  { icon: BadgeCheck, title: 'Quality Assurance', desc: 'We partner only with RERA-registered builders and verified owners.' },
  { icon: Headset, title: 'Customer First', desc: 'Dedicated support from search to possession and beyond.' },
  { icon: TrendingUp, title: 'Market Expertise', desc: 'Data-driven insights to help you make the best decision.' },
];

const timeline = [
  { year: '2019', title: 'Founded', desc: 'Started in Mumbai with a mission to simplify real estate.' },
  { year: '2021', title: 'Expansion', desc: 'Expanded to 8 major cities across India.' },
  { year: '2023', title: 'Technology', desc: 'Launched AI-powered search and virtual tours.' },
  { year: '2025', title: 'Today', desc: 'Serving 15+ cities with 10,000+ verified listings.' },
];

export default function About() {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Building Trust in Real Estate</h1>
          <p>
            EstateNest is a premium real estate platform on a mission to make
            property transactions transparent, effortless and trustworthy for
            every Indian family.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container about__mv">
          <div className="about__mv-card">
            <span className="about__mv-icon"><Target size={28} /></span>
            <h2>Our Mission</h2>
            <p>
              To democratize real estate by providing verified listings,
              transparent pricing and expert guidance — empowering every
              buyer, seller and tenant to make confident decisions.
            </p>
          </div>
          <div className="about__mv-card">
            <span className="about__mv-icon"><Eye size={28} /></span>
            <h2>Our Vision</h2>
            <p>
              To become India's most trusted real estate marketplace — a
              platform where trust, technology and human expertise come
              together to create seamless property experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-alt">
        <div className="container">
          <div className="about__stats">
            {stats.map((s) => (
              <div key={s.label} className="about__stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Values</span>
            <h2>Why Choose EstateNest</h2>
          </div>
          <div className="about__values">
            {values.map((v) => (
              <div key={v.title} className="about__value">
                <span className="about__value-icon"><v.icon size={26} /></span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Journey</span>
            <h2>How We Got Here</h2>
          </div>
          <div className="about__timeline">
            {timeline.map((t, i) => (
              <div key={t.year} className={`about__tl-item ${i % 2 === 1 ? 'about__tl-item--right' : ''}`}>
                <div className="about__tl-dot" />
                <div className="about__tl-content">
                  <span className="about__tl-year">{t.year}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="about__cta">
            <h2>Ready to Experience the Difference?</h2>
            <p>Start browsing verified properties or list your own today.</p>
            <div className="about__cta-actions">
              <Link to="/buy" className="btn btn-primary">Browse Properties <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Developed by Softuition IT Solutions */}
      <section className="section">
        <div className="container">
          <div className="about__credit">
            <span className="about__credit-eyebrow">Development Partner</span>
            <div className="about__credit-brand">
              <img
                src={`${import.meta.env.BASE_URL}softuition-logo.webp`}
                alt="Softuition IT Solutions logo"
                className="about__credit-logo"
              />
              <div className="about__credit-text">
                <h3>Softuition IT Solutions</h3>
                <p>The technology team behind EstateNest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
