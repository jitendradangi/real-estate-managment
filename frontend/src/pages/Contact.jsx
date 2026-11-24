import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { createInquiry } from '../services/inquiries';
import './Contact.css';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 70677 33768', href: 'tel:+917067733768' },
  { icon: Mail, label: 'Email', value: 'jitendradangi732@gmail.com', href: 'mailto:jitendradangi732@gmail.com' },
  { icon: MapPin, label: 'Office', value: '32, Ring Road, Vijay Nagar, Indore, Madhya Pradesh – 452011' },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 7:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
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
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    const subject = form.subject.trim();
    const body = form.message.trim();
    try {
      await createInquiry({
        property_id: null, // general contact inquiry
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        message: subject ? `[${subject}] ${body}` : body,
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setSubmitError(
        typeof detail === 'string'
          ? detail
          : 'Failed to send message. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <header className="contact__header container">
        <span className="eyebrow">Get In Touch</span>
        <h1>Contact Us</h1>
        <p>
          Have a question about a property or need assistance? Our team is
          here to help. Reach out through any of the channels below.
        </p>
      </header>

      <div className="container contact__layout">
        {/* Info panel */}
        <div className="contact__info">
          <h2>Contact Information</h2>
          <p>We're available to assist you with buying, selling, renting or any property-related queries.</p>

          <div className="contact__info-list">
            {contactInfo.map((c) => {
              const inner = (
                <>
                  <span className="contact__info-icon"><c.icon size={20} /></span>
                  <div>
                    <strong>{c.label}</strong>
                    <span>{c.value}</span>
                  </div>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="contact__info-item">{inner}</a>
              ) : (
                <div key={c.label} className="contact__info-item">{inner}</div>
              );
            })}
          </div>

          <div className="contact__info-cta">
            <WhatsAppButton
              phone="917067733768"
              message="Hi EstateNest, I have a question about your services."
            />
            <p className="contact__wa-note">
              <MessageCircle size={15} /> Typically replies within 10 minutes
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="contact__form-wrap">
          {submitted ? (
            <div className="contact__success">
              <CheckCircle2 size={52} />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <h2>Send Us a Message</h2>
              <div className="contact__row">
                <div className="contact__field">
                  <label>Name *</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={(e) => set('name', e.target.value)} />
                  {errors.name && <span className="contact__error">{errors.name}</span>}
                </div>
                <div className="contact__field">
                  <label>Email *</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                  {errors.email && <span className="contact__error">{errors.email}</span>}
                </div>
              </div>
              <div className="contact__row">
                <div className="contact__field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+91 70677 33768" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div className="contact__field">
                  <label>Subject</label>
                  <input type="text" placeholder="e.g. Property inquiry" value={form.subject} onChange={(e) => set('subject', e.target.value)} />
                </div>
              </div>
              <div className="contact__field">
                <label>Message *</label>
                <textarea rows={5} placeholder="How can we help you?" value={form.message} onChange={(e) => set('message', e.target.value)} />
                {errors.message && <span className="contact__error">{errors.message}</span>}
              </div>
              {submitError && <span className="contact__error contact__error--block">{submitError}</span>}
              <button type="submit" className="btn btn-primary contact__submit" disabled={submitting}>
                <Send size={17} /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
