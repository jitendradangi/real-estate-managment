import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export default function WhatsAppButton({ phone = '917067733768', message = 'Hi, I am interested in a property.' }) {
  const text = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${text}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-btn"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>WhatsApp</span>
    </a>
  );
}
