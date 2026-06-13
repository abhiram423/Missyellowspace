import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp,
  FaEnvelope, FaPhone, FaArrowRight
} from 'react-icons/fa'
import yellowspaceLogo from '../assets/yellowspace_image.png'

const SOCIAL = [
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61582036891587', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/missyellowspace?igsh=MXY1dGlkdnR3aHJ2dA==', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/missyellowworkspace/', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/917993927711', label: 'WhatsApp' },
]

const WA_MESSAGE = encodeURIComponent(
  "Hi Miss Yellowspace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?"
)

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
]

const SERVICE_LINKS = [
  'Performance Marketing', 'Social Media Marketing', 'SEO',
  'Graphic Designing', 'Digital Marketing', 'Branding & Animations',
]

/* Inline SVG logo — same as Navbar */
function YellowspaceLogo({ size = 46 }) {
  return (
    <img src={yellowspaceLogo} alt="Yellowspace Logo" style={{ width: size, height: size, objectFit: 'contain' }} />
  )
}

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--bg-secondary) 0%, #020510 100%)',
      borderTop: '1px solid rgba(255,215,0,0.1)',
      paddingTop: 50,
      position: 'relative', zIndex: 1,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '48px',
          paddingBottom: 45,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <YellowspaceLogo size={46} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18, color: '#edf0f8', display: 'flex', gap: '8px'}}>
                  Miss<span style={{ color: '#FFD700' }}>Yellowspace</span>
                </span>
              </div>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 28 }}>
              We craft data-driven digital marketing strategies that transform brands and accelerate business growth in the digital era.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.25, y: -3 }}
                  whileTap={{ scale: 0.88 }}
                  style={{
                    width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10, color: 'var(--text-secondary)', fontSize: 15,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FFD700'; e.currentTarget.style.borderColor = 'rgba(255,215,0,0.25)'; e.currentTarget.style.background = 'rgba(255,215,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 22 }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} style={{ fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 7, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFD700'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <FaArrowRight style={{ fontSize: 10, opacity: 0.6 }} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 22 }}>
              Services
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {SERVICE_LINKS.map(s => (
                <li key={s}>
                  <Link to="/services" style={{ fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 7, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFD700'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <FaArrowRight style={{ fontSize: 10, opacity: 0.6 }} /> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 22 }}>
              Get In Touch
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: FaPhone, text: '+91 79939 27711', href: 'tel:+917993927711' },
                { icon: FaEnvelope, text: 'Missyellowspace@gmail.com', href: 'mailto:Missyellowspace@gmail.com' },
                { icon: FaWhatsapp, text: 'Chat on WhatsApp', href: `https://wa.me/917993927711?text=${WA_MESSAGE}` },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFD700'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Icon style={{ marginTop: 2, flexShrink: 0, color: '#FFD700', fontSize: 14 }} />
                    <span style={{ lineHeight: 1.5 }}>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '22px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Miss Yellowspace. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Crafted with passion for digital excellence
          </p>
        </div>
      </div>
    </footer>
  )
}
