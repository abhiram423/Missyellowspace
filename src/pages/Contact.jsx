import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaFacebook, FaTwitter,
  FaArrowRight, FaCheck, FaPaperPlane, FaClock,
} from 'react-icons/fa'
import SubPageBg from '../components/SubPageBg'
import ParticleField from '../components/ParticleField'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

const WA_MESSAGE = encodeURIComponent(
  "Hi Miss Yellospace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?"
)

const SOCIAL = [
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61582036891587', label: 'Facebook', color: '#1877F2' },
  { icon: FaInstagram, href: 'https://www.instagram.com/missyellowspace?igsh=MXY1dGlkdnR3aHJ2dA==', label: 'Instagram', color: '#E1306C' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/missyellowworkspace/', label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaWhatsapp, href: `https://wa.me/917993927711?text=${WA_MESSAGE}`, label: 'WhatsApp', color: '#25D366' },]

const SERVICES_LIST = [
  'Select a Service',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Google Ads & PPC',
  'Branding & Design',
  'Web Design & Development',
  'Content Marketing',
  'Lead Generation',
  'Analytics & Reporting',
  'Full Digital Marketing Package',
]

function PageHero() {
  return (
    <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
      {[
        { size: 500, top: '-20%', right: '-5%', color: 'var(--orb-1)' },
        { size: 350, bottom: '0%', left: '-5%', color: 'var(--orb-2)' },
      ].map((orb, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, delay: i * 3 }}
          style={{
            position: 'absolute', width: orb.size, height: orb.size,
            top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
          }}
        />
      ))}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.span variants={fadeUp} className="section-tag">Contact Us</motion.span>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2px',
            color: 'var(--text-primary)', marginBottom: 20,
          }}>
            Let's Start Your<br /><span className="gradient-text">Growth Journey</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 36px' }}>
            Ready to transform your digital presence? Reach out — we respond within 2 hours on business days.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: FaClock, text: 'Response within 2 hours' },
              { icon: FaCheck, text: 'Free consultation included' },
              { icon: FaCheck, text: 'No commitment required' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                <Icon style={{ color: 'var(--accent)', fontSize: 12 }} /> {text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ContactCards() {
  return (
    <section style={{ paddingBottom: 80 }}>
      <div className="container">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}
        >
          {[
            { icon: FaPhone, title: 'Call Us', value: '+91 79939 27711', sub: 'Mon–Sat, 9AM – 7PM', href: 'tel:+917993927711', color: '#4CAF50' },
            { icon: FaEnvelope, title: 'Email Us', value: 'Missyellowspace@gmail.com', sub: 'We reply within 2 hours', href: 'mailto:Missyellowspace@gmail.com', color: '#2196F3' },
            { icon: FaWhatsapp, title: 'WhatsApp', value: 'Chat with our team', sub: 'Instant responses', href: `https://wa.me/917993927711?text=${WA_MESSAGE}`, color: '#25D366' },
            { icon: FaMapMarkerAlt, title: 'Visit Us', value: 'Madhapur, Hyderabad', sub: 'Telangana – 500081', href: '#map', color: '#FF5722' },
          ].map(({ icon: Icon, title, value, sub, href, color }) => (
            <motion.a
              key={title}
              variants={fadeUp}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${color}20, 0 0 0 1px ${color}30` }}
              style={{
                display: 'block',
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 20, padding: '28px 24px',
                backdropFilter: 'blur(20px)', transition: 'all 0.35s ease',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color, fontSize: 20, marginBottom: 16,
              }}>
                <Icon />
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{title}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{value}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 18px',
    background: 'var(--bg-glass)', border: `1px solid ${errors[field] ? '#ef4444' : 'var(--border-subtle)'}`,
    borderRadius: 12, color: 'var(--text-primary)', fontSize: 15,
    outline: 'none', fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
        borderRadius: 24, padding: '40px 36px',
        backdropFilter: 'blur(20px)',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
        Send Us a Message
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
        Fill in your details and we'll get back to you within 2 hours.
      </p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '40px 0' }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
              background: 'rgba(76,175,80,0.12)', border: '2px solid #4CAF50',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, color: '#4CAF50',
            }}>
              <FaCheck />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Message Sent!</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              Thank you! Our team will reach out to you within 2 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { field: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text' },
                { field: 'email', label: 'Email Address *', placeholder: 'your@email.com', type: 'email' },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{label}</label>
                  <input
                    type={type}
                    value={form[field]}
                    onChange={e => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle(field)}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = errors[field] ? '#ef4444' : 'var(--border-subtle)'}
                  />
                  {errors[field] && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors[field]}</p>}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  style={inputStyle('phone')}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Service Interested In</label>
                <select
                  value={form.service}
                  onChange={e => handleChange('service', e.target.value)}
                  style={{ ...inputStyle('service'), cursor: 'pointer' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
                >
                  {SERVICES_LIST.map(s => <option key={s} value={s === 'Select a Service' ? '' : s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Your Message *</label>
              <textarea
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                placeholder="Tell us about your business, goals and what you need help with..."
                rows={5}
                style={{ ...inputStyle('message'), resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border-subtle)'}
              />
              {errors.message && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              style={{ fontSize: 16, padding: '16px', justifyContent: 'center', opacity: sending ? 0.8 : 1 }}
            >
              {sending ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #07091a', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                  Sending...
                </>
              ) : (
                <> <FaPaperPlane style={{ fontSize: 14 }} /> Send Message </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function MapSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <ParticleField count={40} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 50 }}>
          <motion.span variants={fadeUp} className="section-tag">Our Location</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            Visit Our <span className="gradient-text">Office</span>
          </motion.h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, alignItems: 'start' }}>
          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 22, padding: '32px 28px', backdropFilter: 'blur(20px)',
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: 15,
                background: 'rgba(255,87,34,0.12)', border: '1px solid rgba(255,87,34,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FF5722', fontSize: 22, marginBottom: 22,
              }}>
                <FaMapMarkerAlt />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                Miss Yellospace HQ
              </h3>
              <address style={{ fontStyle: 'normal', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 2, marginBottom: 24 }}>
                Unit 407, 4th Floor<br />
                P.No. 1-98/4/1 Jain Sadguru<br />
                Images Capital Park<br />
                IMAGE Garden Road, Madhapur<br />
                Hyderabad, Telangana – 500081
              </address>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  { icon: FaPhone, text: '+91 79939 27711', href: 'tel:+917993927711' },
                  { icon: FaEnvelope, text: 'Missyellowspace@gmail.com', href: 'mailto:Missyellowspace@gmail.com' },
                  { icon: FaClock, text: 'Mon–Sat: 9:00 AM – 7:00 PM' },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <Icon style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0 }} />
                    {href ? (
                      <a href={href} style={{ color: 'inherit', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >{text}</a>
                    ) : text}
                  </div>
                ))}
              </div>
              <a
                href="https://maps.google.com/?q=Madhapur+Hyderabad+Telangana+500081"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', fontSize: 14, padding: '12px 24px' }}
              >
                Get Directions <FaArrowRight style={{ fontSize: 11 }} />
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--border-subtle)', height: 420 }}
          >
            <iframe
              id="map"
              title="Miss Yellospace Office Location"
              src="https://maps.google.com/maps?q=Madhapur+Hyderabad+Telangana+500081&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'brightness(0.9) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SocialSection() {
  return (
    <section className="section-sm" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h3 variants={fadeUp} style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
            Follow Us on Social Media
          </motion.h3>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
            Stay updated with our latest insights, tips, and client success stories.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {SOCIAL.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px',
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 50, fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)',
                  backdropFilter: 'blur(20px)', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <Icon style={{ fontSize: 18 }} /> {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SubPageBg />
      <PageHero />
      <ContactCards />
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 40, alignItems: 'start' }}>
            <ContactForm />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 24, padding: '36px', backdropFilter: 'blur(20px)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
                Why Work With Us?
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
                Every consultation starts with listening. We understand your goals before we suggest a single strategy.
              </p>
              {[
                '📞 Free 30-min strategy call',
                '📊 Free digital audit worth ₹5,000',
                '📈 ROI projections before we begin',
                '✅ No long-term contracts',
                '🔒 100% confidential & transparent',
                '⚡ Campaign live in 72 hours',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 14, color: 'var(--text-primary)' }}>
                  {item}
                </div>
              ))}
              <div style={{ marginTop: 28 }}>
                <a
                  href={`https://wa.me/917993927711?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'flex', justifyContent: 'center', fontSize: 15, padding: '14px' }}
                >
                  <FaWhatsapp style={{ fontSize: 16 }} /> Chat on WhatsApp Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <MapSection />
      <SocialSection />
    </main>
  )
}
