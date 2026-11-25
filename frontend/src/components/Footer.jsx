import { Link } from 'react-router-dom';
import { Home as HomeIcon, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.1 3.8H5.3L17.8 20z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98zM.22 8.5h4.56V24H.22V8.5zM8.34 8.5h4.37v2.13h.06c.6-1.14 2.08-2.34 4.29-2.34 4.58 0 5.42 3.01 5.42 6.92V24h-4.56v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V24H8.34V8.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">
                <HomeIcon size={20} />
              </span>
              <span>
                Estate<span>Nest</span>
              </span>
            </Link>
            <p>
              Premium real estate marketplace helping you find, buy, rent and
              sell properties across India's finest cities.
            </p>
            <div className="footer__social">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/buy">Buy Property</Link></li>
              <li><Link to="/rent">Rent Property</Link></li>
              <li><Link to="/sell">Sell Property</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Top Cities</h4>
            <ul>
              <li><Link to="/buy?city=Mumbai">Mumbai</Link></li>
              <li><Link to="/buy?city=Bangalore">Bangalore</Link></li>
              <li><Link to="/buy?city=Delhi">Delhi</Link></li>
              <li><Link to="/buy?city=Pune">Pune</Link></li>
              <li><Link to="/buy?city=Hyderabad">Hyderabad</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact Info</h4>
            <ul className="footer__contact">
              <li><Phone size={16} /><span>+91 00000 00000</span></li>
              <li>
                <Mail size={16} />
                <a href="mailto:demo@softuitionitsolutions.com">demo@softuitionitsolutions.com</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>32, Ring Road, Vijay Nagar, Indore, Madhya Pradesh – 452011</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} EstateNest. All rights reserved.</p>
          <p>Privacy Policy &middot; Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
