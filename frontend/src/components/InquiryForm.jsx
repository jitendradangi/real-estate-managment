import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { createInquiry } from '../services/inquiries';
import './InquiryForm.css';

export default function InquiryForm({ property, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
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
    const payload = {
      property_id: property?.id ?? null,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    };
    try {
      await createInquiry(payload);
      onSubmit?.(payload);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setSubmitError(
        typeof detail === 'string'
          ? detail
          : 'Failed to send inquiry. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="inq__success">
        <CheckCircle2 size={40} />
        <h3>Inquiry Sent!</h3>
        <p>Thank you for your interest. Our agent will contact you shortly.</p>
        <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="inq" onSubmit={handleSubmit} noValidate>
      <div className="inq__row">
        <div className="inq__field">
          <label>Name *</label>
          <input
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
          {errors.name && <span className="inq__error">{errors.name}</span>}
        </div>
        <div className="inq__field">
          <label>Email *</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
          />
          {errors.email && <span className="inq__error">{errors.email}</span>}
        </div>
      </div>

      <div className="inq__field">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="+91 00000 00000"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
        />
      </div>

      <div className="inq__field">
        <label>Message *</label>
        <textarea
          rows={4}
          placeholder="I'm interested in this property. Please share more details..."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
        />
        {errors.message && <span className="inq__error">{errors.message}</span>}
      </div>

      {submitError && <span className="inq__error inq__error--block">{submitError}</span>}
      <button type="submit" className="btn btn-primary btn-block inq__submit" disabled={submitting}>
        <Send size={17} /> {submitting ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
