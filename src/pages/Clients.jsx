import { motion } from 'framer-motion'
import { FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SubPageBg from '../components/SubPageBg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }

const CLIENT_CATEGORIES = [
  { label: 'E-Commerce', count: '80+', color: '#FFD700' },
  { label: 'Real Estate', count: '60+', color: '#2196F3' },
  { label: 'Healthcare', count: '45+', color: '#4CAF50' },
  { label: 'Education', count: '55+', color: '#FF9800' },
  { label: 'Retail & Fashion', count: '70+', color: '#9C27B0' },
  { label: 'Hospitality', count: '40+', color: '#00BCD4' },
  { label: 'Technology', count: '65+', color: '#FF5722' },
  { label: 'Finance', count: '35+', color: '#607D8B' },
]

const STATS = [
  { value: '500+', label: 'Clients Served' },
  { value: '15+', label: 'Industries' },
  { value: '96%', label: 'Retention Rate' },
  { value: '6x', label: 'Avg. ROI' },
]

const TESTIMONIALS = [
  {
    name: 'Arun Mehta', role: 'CEO, FashionHub', rating: 5,
    text: 'Miss Yellospace scaled our online revenue by 280% in just 4 months. Their approach to performance marketing is truly exceptional.',
  },
  {
    name: 'Sunita Reddy', role: 'Founder, EduLearn', rating: 5,
    text: 'The SEO strategy they implemented doubled our organic traffic in 90 days. Best investment we have made for our startup.',
  },
  {
    name: 'Vikram Singh', role: 'Director, PropCo Realty', rating: 5,
    text: 'Our leads from Google Ads went up 5x while the cost per lead dropped by 60%. Miss Yellospace is a game changer.',
  },
  {
    name: 'Deepa Nair', role: 'Owner, Spice Garden Restaurants', rating: 5,
    text: 'Their social media content went viral twice and we got 20,000 new followers in a single month. Incredible creative team.',
  },
  {
    name: 'Rahul Gupta', role: 'CTO, FinTech Solutions', rating: 5,
    text: 'From branding to web development — they handled everything seamlessly. Professional, fast, and results-oriented.',
  },
  {
    name: 'Kavitha Prasad', role: 'CEO, MediCare Clinics', rating: 5,
    text: 'Patient inquiries from our website increased 3x after Miss Yellospace revamped our digital presence. Highly recommended.',
  },
]

const WA_MSG = encodeURIComponent("Hi Miss Yellospace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?")

function PageHero() {
  return (
    <section style={{
      position: 'relative', paddingTop: 120, paddingBottom: 60,
      overflow: 'hidden', minHeight: 480,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {[
        { size: 500, top: '-20%', right: '-8%', color: 'var(--orb-1)' },
        { size: 400, bottom: '-15%', left: '-5%', color: 'var(--orb-2)' },
      ].map((orb, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.1, 1] }}
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
          <motion.span variants={fadeUp} className="section-tag">Our Clients</motion.span>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5.5vw, 66px)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2px',
            color: 'var(--text-primary)', margin: '0 auto 20px',
          }}>
            Trusted by <span className="gradient-text">500+ Brands</span><br />Across India
          </motion.h1>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            From startups to enterprises — businesses across every industry trust Miss Yellospace to accelerate their growth.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section style={{ paddingBottom: 80, position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--bg-card)', border: '1px solid rgba(255,215,0,0.15)',
                borderRadius: 20, padding: '32px 24px', textAlign: 'center',
                backdropFilter: 'blur(20px)', transition: 'all 0.3s',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 900, color: '#FFD700', lineHeight: 1, marginBottom: 10,
              }}>{value}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IndustriesSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.span variants={fadeUp} className="section-tag">Industries We Serve</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            Across <span className="gradient-text">15+ Industries</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            No matter your sector, we have the expertise and track record to drive your growth.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}
        >
          {CLIENT_CATEGORIES.map(({ label, count, color }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: `${color}40` }}
              style={{
                background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)', borderRadius: 18,
                padding: '28px 24px', transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'var(--font-heading)', color }}>{count}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>brands served</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.span variants={fadeUp} className="section-tag">Client Testimonials</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 16px' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            Hear directly from the businesses we've helped grow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
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
                transition: 'all 0.35s ease', display: 'flex', flexDirection: 'column', gap: 18,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <FaQuoteLeft style={{ color: '#FFD700', fontSize: 24, opacity: 0.6 }} />
                <div style={{ display: 'flex', gap: 3, color: '#FFD700', fontSize: 12 }}>
                  {Array(rating).fill('★').join('')}
                </div>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
                "{text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700 0%, #06081a 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: '#fff',
                }}>{name[0]}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ClientsCTA() {
  return (
    <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,215,0,0.08)', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            Ready to Join Our <span className="gradient-text">Success Stories?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 36px' }}>
            Let's build your brand's success story together. Start with a free strategy session.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/917993927711?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get Free Consultation <FaArrowRight style={{ fontSize: 12 }} />
            </a>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Clients() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SubPageBg />
      <PageHero />
      <StatsSection />
      <IndustriesSection />
      <TestimonialsSection />
      <ClientsCTA />
    </main>
  )
}
