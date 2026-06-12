import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import SubPageBg from '../components/SubPageBg'
import Marquee from '../components/Marquee'
import ParticleField from '../components/ParticleField'
import {
  FaSearch, FaShareAlt, FaGoogle, FaPalette, FaCode,
  FaFileAlt, FaMagnet, FaChartBar, FaArrowRight, FaCheck,
  FaStar, FaRocket, FaChartLine, FaUsers,
} from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const SERVICES = [
  {
    slug: 'seo',
    icon: FaSearch,
    title: 'Search Engine Optimization',
    short: 'SEO',
    desc: 'Rank higher on Google and drive qualified organic traffic to your website with our proven SEO methodology.',
    features: ['Technical SEO Audit', 'Keyword Research & Strategy', 'On-Page & Off-Page Optimization', 'Local SEO', 'SEO Content Creation', 'Monthly Analytics Reports'],
    result: '3x more organic traffic',
    color: '#4CAF50',
  },
  {
    slug: 'social-media-marketing',
    icon: FaShareAlt,
    title: 'Social Media Marketing',
    short: 'SMM',
    desc: 'Build a powerful social presence that engages your audience, builds community, and drives real business results.',
    features: ['Platform Strategy & Setup', 'Content Calendar & Creation', 'Community Management', 'Influencer Collaborations', 'Social Media Ads', 'Performance Analytics'],
    result: '10x follower growth',
    color: '#E91E8C',
  },
  {
    slug: 'performance-marketing',
    icon: FaGoogle,
    title: 'Performance Marketing',
    short: 'Performance',
    desc: 'Laser-targeted paid campaigns that put your business in front of high-intent buyers at the perfect moment.',
    features: ['Campaign Strategy & Setup', 'Keyword Bidding & Management', 'Ad Copywriting & A/B Testing', 'Landing Page Optimization', 'Remarketing Campaigns', 'ROI Tracking & Reporting'],
    result: '6x ROAS on average',
    color: '#FF5722',
  },
  {
    slug: 'branding-and-animations',
    icon: FaPalette,
    title: 'Branding & Animations',
    short: 'Brand',
    desc: 'Create a brand identity that commands attention, builds trust, and leaves a lasting impression with motion-led visuals.',
    features: ['Logo & Visual Identity', 'Brand Guidelines & Style Guide', 'Motion Graphics & Animations', 'Social Media Templates', 'Packaging Design', 'Brand Strategy'],
    result: 'Premium brand recognition',
    color: '#9C27B0',
  },
  {
    slug: 'digital-marketing',
    icon: FaCode,
    title: 'Digital Marketing',
    short: 'Digital',
    desc: 'High-performance digital experiences and campaigns engineered to turn visitors into customers.',
    features: ['Custom Web Design (UI/UX)', 'Responsive & Mobile-First', 'Fast Loading & SEO-Ready', 'E-Commerce Solutions', 'Landing Page Development', 'Website Maintenance'],
    result: '40% higher conversions',
    color: '#2196F3',
  },
  {
    icon: FaFileAlt,
    title: 'Content Marketing',
    short: 'Content',
    desc: 'Strategic content that educates, engages, and converts — establishing your brand as the trusted authority.',
    features: ['Content Strategy & Planning', 'Blog Writing & SEO Articles', 'Video Scripts & Reels', 'Email Newsletters', 'Infographics & Visuals', 'Content Distribution'],
    result: '2x engagement rates',
    color: '#FF9800',
  },
  {
    icon: FaMagnet,
    title: 'Lead Generation',
    short: 'Leads',
    desc: 'End-to-end lead generation systems that consistently attract, nurture, and convert your ideal customers.',
    features: ['Lead Funnel Design & Build', 'Lead Magnet Creation', 'Email Nurture Sequences', 'CRM Integration', 'Landing Page Optimization', 'Lead Quality Scoring'],
    result: '5x qualified lead volume',
    color: '#F44336',
  },
  {
    icon: FaChartBar,
    title: 'Analytics & Reporting',
    short: 'Analytics',
    desc: 'Transform raw data into actionable insights with comprehensive analytics dashboards and clear reporting.',
    features: ['Google Analytics 4 Setup', 'Custom Dashboard Creation', 'Monthly Performance Reports', 'Competitor Analysis', 'Conversion Tracking', 'Data-Driven Strategy Reviews'],
    result: 'Full data transparency',
    color: '#00BCD4',
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery & Audit', desc: 'We deep-dive into your business, goals, and current digital footprint to identify opportunities and gaps.' },
  { step: '02', title: 'Strategy & Planning', desc: 'Our experts craft a custom, data-driven strategy tailored specifically to your goals, audience, and budget.' },
  { step: '03', title: 'Execute & Launch', desc: 'We implement with precision, creative excellence, and meticulous attention to every detail.' },
  { step: '04', title: 'Measure & Optimize', desc: 'Continuous monitoring and optimization ensures your campaigns keep improving and delivering better ROI.' },
]

function PageHero() {
  return (
    <section style={{
      position: 'relative', paddingTop: 120, paddingBottom: 60,
      overflow: 'hidden', minHeight: 480,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {[
        { size: 500, top: '-20%', right: '-8%', color: 'var(--orb-1)' },
        { size: 400, bottom: '-10%', left: '-5%', color: 'var(--orb-2)' },
      ].map((orb, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, delay: i * 3, ease: 'easeInOut' }}
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
          <motion.span variants={fadeUp} className="section-tag">Our Services</motion.span>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5.5vw, 66px)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2px',
            color: 'var(--text-primary)', marginBottom: 20, margin: '0 auto 20px',
          }}>
            Full-Stack Digital <span className="gradient-text">Marketing Solutions</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            From SEO to paid ads to complete brand overhauls — every service is crafted to drive measurable growth for your business.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: FaRocket, text: '8 Core Services' },
              { icon: FaUsers, text: '500+ Happy Clients' },
              { icon: FaChartLine, text: 'Proven ROI' },
              { icon: FaStar, text: '5-Star Rated' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--bg-glass)', backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-subtle)', borderRadius: 50,
                padding: '8px 18px', fontSize: 13.5, color: 'var(--text-secondary)',
              }}>
                <Icon style={{ color: 'var(--accent)', fontSize: 13 }} /> {text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesGrid({ services }) {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <ParticleField count={50} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}
        >
          {services.map(({ icon: Icon, title, short, desc, features, result, color }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 24px 60px rgba(0,0,0,0.25), 0 0 0 1px ${color}30` }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 22, overflow: 'hidden',
                backdropFilter: 'blur(20px)', transition: 'all 0.35s ease',
              }}
            >
              {/* Card header accent */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />
              <div style={{ padding: '30px 28px' }}>
                {/* Icon + badge row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 15,
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, fontSize: 20,
                  }}>
                    <Icon />
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '1px',
                    color, background: `${color}15`, border: `1px solid ${color}30`,
                    padding: '4px 12px', borderRadius: 50, textTransform: 'uppercase',
                  }}>{short}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.2 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 22 }}>{desc}</p>

                {/* Features */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'var(--text-secondary)' }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: `${color}18`, border: `1px solid ${color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <FaCheck style={{ fontSize: 8, color }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Result tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${color}12`, border: `1px solid ${color}25`,
                  borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, color,
                }}>
                  <FaChartLine style={{ fontSize: 11 }} /> {result}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 1 }}>
      <ParticleField count={40} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.span variants={fadeUp} className="section-tag">Our Process</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            How We <span className="gradient-text">Make It Happen</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            A proven 4-step framework that consistently delivers exceptional results for our clients.
          </motion.p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
          {PROCESS.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '0 20px', textAlign: 'center', position: 'relative' }}
            >
              {/* Connector line */}
              {i < PROCESS.length - 1 && (
                <div style={{
                  position: 'absolute', top: 32, right: '-1px',
                  width: '50%', height: 1,
                  background: 'linear-gradient(90deg, var(--border), transparent)',
                  display: 'none',
                }} className="connector" />
              )}
              <div style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto 22px',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 900, color: '#07091a',
                boxShadow: '0 8px 28px var(--accent-glow)',
              }}>{step}</div>
              <h4 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, fontFamily: 'var(--font-heading)' }}>{title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesCTA() {
  const WA_MESSAGE = encodeURIComponent("Hi Miss Yellospace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?")
  return (
    <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.span variants={fadeUp} className="section-tag">Get Started Today</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            Ready to Scale Your <span className="gradient-text">Digital Growth?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 36px' }}>
            Book a free strategy session with our experts and discover exactly which services will drive the most growth for your business.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            <a href={`https://wa.me/917993927711?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Book Free Consultation <FaArrowRight style={{ fontSize: 13 }} />
            </a>
            <a href="tel:+917993927711" className="btn-outline" style={{ fontSize: 15 }}>
              Call +91 79939 27711
            </a>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
            {['No long-term contracts', 'Free strategy audit', '100% transparent pricing', 'Results guaranteed'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-secondary)' }}>
                <FaCheck style={{ color: 'var(--accent)', fontSize: 11 }} /> {f}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const { search } = useLocation()
  const selectedSlug = new URLSearchParams(search).get('service')
  const selectedService = SERVICES.find(service => service.slug === selectedSlug)
  const servicesToShow = selectedService ? [selectedService] : SERVICES

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SubPageBg />
      <PageHero />
      <Marquee />
      {selectedService && (
        <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="container" style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 10, alignItems: 'center', padding: '18px 24px', borderRadius: 24, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.18)' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#FFD700' }}>
                Selected Service
              </p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedService.title}
              </h2>
              <Link to="/services" className="btn-outline" style={{ marginTop: 8, fontSize: 14, padding: '10px 20px' }}>
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}
      <ServicesGrid services={servicesToShow} />
      <ProcessSection />
      <ServicesCTA />
    </main>
  )
}
