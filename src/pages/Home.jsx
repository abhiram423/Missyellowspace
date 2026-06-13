import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MorphingPolygonsBg from '../components/MorphingPolygonsBg'
import ParticleField from '../components/ParticleField'
import RotatingText from '../components/RotatingText'
import Marquee from '../components/Marquee'
import ContentHalo from '../components/ContentHalo'
import {
  FaArrowRight, FaCheck, FaQuoteLeft,
  FaSearch, FaShareAlt, FaPalette, FaCode, FaMagnet, FaBullhorn,
  FaMagic, FaMobile, FaChartLine,
} from 'react-icons/fa'
import { HiLightningBolt, HiShieldCheck, HiChartBar, HiSupport, HiTemplate, HiCursorClick } from 'react-icons/hi'

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }

/* ── data ── */
const SERVICES_PREVIEW = [
  { icon: FaSearch, title: 'Search Engine Optimization', desc: 'Dominate search rankings with data-driven SEO strategies that compound over time.' },
  { icon: FaShareAlt, title: 'Social Media Marketing', desc: 'Build loyal communities that engage, convert, and advocate for your brand.' },
  { icon: FaChartLine, title: 'Performance Marketing', desc: 'Precision-targeted campaigns that deliver measurable ROI on every rupee spent.' },
  { icon: FaPalette, title: 'Graphic Designing', desc: 'Craft stunning visuals that stand out, resonate, and build lasting brand identity.' },
  { icon: FaCode, title: 'Digital Marketing', desc: 'A premium, data-driven digital agency accelerating business growth through cutting-edge performance marketing and innovative design' },
  { icon: FaMagic, title: 'Branding & Animations', desc: 'End-to-end brand identity with motion design that captivates your audience.' },
]

const WHY_US = [
  { icon: HiLightningBolt, title: 'Results-Driven', desc: 'Every strategy built around measurable outcomes and ROI.' },
  { icon: HiChartBar, title: 'Data-First', desc: 'Intelligence-led decisions across every campaign and creative.' },
  { icon: HiShieldCheck, title: 'Proven Track Record', desc: '500+ brands successfully scaled with our methodology.' },
  { icon: HiSupport, title: '24/7 Support', desc: 'Your dedicated growth partner, always available.' },
  { icon: HiTemplate, title: 'Custom Strategies', desc: 'No cookie-cutter plans — built uniquely for your brand.' },
  { icon: HiCursorClick, title: 'Transparent Reporting', desc: 'Real-time dashboards with clear, honest reporting.' },
]

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar', role: 'Founder, TechNova', rating: 5,
    text: "Miss Yellowspace transformed our online presence completely. Within 3 months, organic traffic tripled and lead quality improved dramatically.",
  },
  {
    name: 'Priya Sharma', role: 'CEO, StyleBoutique', rating: 5,
    text: "Their social strategy grew our Instagram from 2K to 45K followers in 6 months. Sales from social increased by 340%. Absolutely brilliant!",
  },
  {
    name: 'Amit Patel', role: 'Director, HealthCorp', rating: 5,
    text: "The ROI from their performance marketing is unmatched. 6x return on every rupee spent. Miss Yellowspace is our go-to digital partner.",
  },
]

const WA_MSG = encodeURIComponent("Hi Miss Yellowspace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?")

/* ── HERO SECTION ── */
function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: 80,
    }}>
      {/* Full-screen morphing background */}
      <MorphingPolygonsBg />
      <ParticleField count={90} />

      {/* Subtle vignette overlay for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,8,26,0.45) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Centered content with content halo behind headlines */}
      <ContentHalo>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
          <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* Welcome subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 500,
              color: 'rgba(237,240,248,0.85)',
              marginBottom: 18,
              letterSpacing: '0.3px',
            }}
          >
            Welcome to{' '}
            <span style={{ color: 'rgba(237,240,248,0.85)', fontWeight: 700 }}>Miss </span>
            <span style={{ color: '#FFD700' }}>Yellowspace{'...!'}</span>
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              color: '#edf0f8',
              marginBottom: 0,
            }}
          >
            Innovative solutions for
          </motion.h1>

          {/* Rotating service name */}
          <motion.div
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 7vw, 90px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-2px',
              marginBottom: 40,
              minHeight: '1.2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RotatingText />
          </motion.div>

          {/* Sub-description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              color: 'rgba(138,155,191,0.9)',
              maxWidth: 600,
              margin: '0 auto 44px',
              lineHeight: 1.8,
            }}
          >
            We craft data-driven digital strategies that transform brands, accelerate growth, and deliver exceptional ROI for ambitious businesses across India.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a
              href={`https://wa.me/917993927711?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 15, padding: '16px 36px' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Free Consultation <FaArrowRight style={{ fontSize: 12 }} />
            </motion.a>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/services" className="btn-outline" style={{ fontSize: 15, padding: '14px 32px' }}>
                Our Services <FaArrowRight style={{ fontSize: 11 }} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 52, flexWrap: 'wrap' }}>
            {['500+ Brands Scaled', 'Google Partner Agency', '15+ Industries Served'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(138,155,191,0.8)' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FaCheck style={{ color: '#FFD700', fontSize: 9 }} />
                </div>
                {f}
              </div>
            ))}
          </motion.div>
          </motion.div>
        </div>
      </ContentHalo>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          width: 22, height: 38, border: '2px solid rgba(255,215,0,0.3)',
          borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 7, zIndex: 3,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 3, height: 8, background: '#FFD700', borderRadius: 2 }}
        />
      </motion.div>
    </section>
  )
}

/* ── Services ── */
function ServicesSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 1 }}>
      <ParticleField count={60} style={{ opacity: 0.6 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.span variants={fadeUp} className="section-tag">What We Do</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 16px' }}>
            Our Core <span className="gradient-text">Services</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            From strategy to execution — every service maximizes your digital presence and revenue.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}
        >
          {SERVICES_PREVIEW.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -10, boxShadow: '0 28px 70px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.15)' }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 22, padding: '32px 28px',
                backdropFilter: 'blur(20px)', transition: 'all 0.35s ease', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
              }} />
              <div style={{
                width: 54, height: 54, borderRadius: 16,
                background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFD700', fontSize: 21, marginBottom: 20,
              }}><Icon /></div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
                {title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{desc}</p>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#FFD700' }}>
                Learn more <FaArrowRight style={{ fontSize: 10 }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 50 }}>
          <Link to="/services" className="btn-outline" style={{ position: 'relative', overflow: 'hidden' }}>
            Explore All Services
            <motion.span animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} style={{ display: 'inline-flex', marginLeft: 8 }}>
              <FaArrowRight style={{ fontSize: 12 }} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Why Us ── */
function WhyUsSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <ParticleField count={50} style={{ opacity: 0.5 }} />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 64, alignItems: 'center' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.span variants={fadeUp} className="section-tag">Why Miss Yellospace</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">
              We Don't Just Market.<br />We <span className="gradient-text">Deliver Results.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle" style={{ marginBottom: 32 }}>
              Creativity meets data intelligence to build strategies that consistently outperform expectations and drive real business growth.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="btn-primary">
                Learn Our Approach <FaArrowRight style={{ fontSize: 12 }} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5, borderColor: 'rgba(255,215,0,0.25)' }}
                style={{
                  background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-subtle)', borderRadius: 18,
                  padding: '22px 18px', transition: 'all 0.3s',
                }}
              >
                <div style={{ color: '#FFD700', fontSize: 22, marginBottom: 12 }}><Icon /></div>
                <h4 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ── */
function TestimonialsSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 1 }}>
      <ParticleField count={50} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.span variants={fadeUp} className="section-tag">Client Stories</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 16px' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            Real results, real businesses, real growth — here's what our clients experience.
          </motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24 }}
        >
          {TESTIMONIALS.map(({ name, role, rating, text }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -7, boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 22, padding: '32px 28px', backdropFilter: 'blur(20px)',
                transition: 'all 0.35s ease', display: 'flex', flexDirection: 'column', gap: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <FaQuoteLeft style={{ color: '#FFD700', fontSize: 26, opacity: 0.6 }} />
                <div className="stars" style={{ fontSize: 13 }}>{Array(rating).fill('★').join('')}</div>
              </div>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
                "{text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700 0%, #06081a 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: '#fff',
                }}>{name[0]}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function ContactCTA() {
  return (
    <section id="contact" style={{ padding: '100px 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,215,0,0.08)', position: 'relative', zIndex: 1 }}>
      <ParticleField count={50} style={{ opacity: 0.5 }} />
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.span variants={fadeUp} className="section-tag">Ready to Grow?</motion.span>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5vw, 58px)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1.5px',
            color: 'var(--text-primary)', marginBottom: 20,
          }}>
            Let's Build Something<br /><span className="gradient-text">Extraordinary Together</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 44px' }}>
            Join 500+ businesses that trust Miss Yellowspace to drive their digital growth. Your success story starts with a free consultation.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href={`https://wa.me/917993927711?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 16, padding: '17px 38px' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >
              Start Free Consultation <FaArrowRight style={{ fontSize: 13 }} />
            </motion.a>
            <motion.a
              href="tel:+917993927711"
              className="btn-outline"
              style={{ fontSize: 15 }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >
              Call Us Now
            </motion.a>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {['Free Strategy Session', 'No Contracts Required', '100% Transparent Pricing'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                <FaCheck style={{ color: '#FFD700', fontSize: 12 }} /> {f}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Marquee />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ContactCTA />
    </main>
  )
}
