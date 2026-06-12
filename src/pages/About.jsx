import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SubPageBg from '../components/SubPageBg'
import Marquee from '../components/Marquee'
import ParticleField from '../components/ParticleField'
import ContentHalo from '../components/ContentHalo'
import yellowspaceLogo from '../assets/yellowspace_image.png'
import {
  FaArrowRight, FaCheck, FaLightbulb, FaHeart, FaUsers,
  FaRocket, FaShieldAlt, FaHandshake, FaStar, FaChartLine,
  FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaWhatsapp,
} from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const VALUES = [
  { icon: FaLightbulb, title: 'Innovation', desc: 'We constantly push boundaries and embrace cutting-edge strategies to keep your brand ahead of the curve.' },
  { icon: FaHeart, title: 'Passion', desc: 'Every project receives our wholehearted commitment. Your success is our personal mission and greatest reward.' },
  { icon: FaShieldAlt, title: 'Integrity', desc: 'Total transparency in every campaign, report, and conversation. We do what we say, always.' },
  { icon: FaHandshake, title: 'Partnership', desc: "We don't just work for you — we work with you. Your growth goals become our own mission." },
  { icon: FaChartLine, title: 'Excellence', desc: 'We set the bar high and continuously raise it, delivering premium quality in everything we create.' },
  { icon: FaRocket, title: 'Growth', desc: 'We are relentlessly focused on scalable, sustainable results that compound over time for your business.' },
]

const SOCIAL = [
  { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61582036891587' },
  { icon: FaInstagram, href: 'https://www.instagram.com/missyellowspace?igsh=MXY1dGlkdnR3aHJ2dA==' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/missyellowworkspace/' },
  { icon: FaWhatsapp, href: 'https://wa.me/917993927711' },
]

function PageHero() {
  return (
    <section style={{
      position: 'relative', paddingTop: 120, paddingBottom: 60,
      overflow: 'hidden', minHeight: 520,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Ambient orbs */}
      {[
        { size: 500, top: '-20%', right: '-10%', color: 'var(--orb-1)' },
        { size: 400, bottom: '-10%', left: '-5%', color: 'var(--orb-2)' },
      ].map((orb, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 3, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: orb.size, height: orb.size,
            top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none',
          }}
        />
      ))}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
        <ContentHalo>
          <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.span variants={fadeUp} className="section-tag">About Miss Yellospace</motion.span>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5.5vw, 66px)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2px',
            color: 'var(--text-primary)', marginBottom: 20, margin: '0 auto 20px',
          }}>
            We Are the Agency That<br /><span className="gradient-text">Makes Brands Grow</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            A passionate team of digital experts on a mission to help businesses of every size unlock their full online potential.
          </motion.p>
          </motion.div>
        </ContentHalo>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 60, alignItems: 'center' }}>
          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
              border: '1px solid rgba(255,215,0,0.15)', borderRadius: 24, padding: 40,
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <img src={yellowspaceLogo} alt="Miss Yellospace" style={{ width: 56, height: 56, borderRadius: 16 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>
                    Miss <span style={{ color: '#FFD700' }}>Yellowspace</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Est. 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIAL.map(({ icon: Icon, href }) => (
                  <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    style={{
                      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.18)',
                      borderRadius: 9, color: '#FFD700', fontSize: 14,
                    }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.span variants={fadeUp} className="section-tag">Our Story</motion.span>
            <motion.h2 variants={fadeUp} className="section-title">
              Born From a Passion for <span className="gradient-text">Digital Growth</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 20 }}>
              Miss Yellowspace was founded with a bold vision: to make world-class digital marketing accessible to businesses of all sizes. We saw a gap in the market — too many agencies promising results without delivering, too many businesses struggling to navigate the digital landscape.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 32 }}>
              So we built something different. A team of genuine experts, obsessed with data and powered by creativity — dedicated to one thing: <strong style={{ color: 'var(--text-primary)' }}>your measurable, sustainable growth.</strong>
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['500+ businesses transformed', 'Results delivered across 15+ industries', 'Full-stack digital expertise under one roof'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'var(--text-primary)' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FaCheck style={{ color: '#FFD700', fontSize: 10 }} />
                  </div>
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MissionVisionSection() {
  return (
    <section className="section" style={{ position: 'relative', zIndex: 1 }}>
      <ParticleField count={40} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.span variants={fadeUp} className="section-tag">Our Purpose</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto' }}>
            What Drives <span className="gradient-text">Everything We Do</span>
          </motion.h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            {
              icon: FaRocket, title: 'Our Mission',
              text: 'We combine creativity, strategy, and technology to help businesses increase visibility, build strong customer relationships, and achieve their marketing goals with confidence.',
            },
            {
              icon: FaStar, title: 'Our Vision',
              text: 'To become a trusted growth partner for brands by transforming innovative ideas into impactful digital experiences across India and beyond.',
            },
            {
              icon: FaUsers, title: 'Our Promise',
              text: 'To maintain the highest standards of quality, transparency, and client-centricity — treating every business we work with as if it were our own.',
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 22, padding: '36px 30px',
                backdropFilter: 'blur(20px)', transition: 'all 0.3s',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFD700', fontSize: 24, margin: '0 auto 22px',
              }}>
                <Icon />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
                {title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <ParticleField count={50} style={{ opacity: 0.5 }} />
      <div className="container">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.span variants={fadeUp} className="section-tag">Core Values</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 16px' }}>
            The Principles That <span className="gradient-text">Define Us</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
            These aren't just words on a wall — they are the beliefs that guide every decision we make.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}
        >
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -5, borderColor: 'rgba(255,215,0,0.25)' }}
              style={{
                display: 'flex', gap: 18, alignItems: 'flex-start',
                background: 'var(--bg-glass)', backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 18, padding: '26px 24px',
                transition: 'all 0.3s',
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFD700', fontSize: 18,
              }}>
                <Icon />
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</h4>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AboutCTA() {
  const WA_MESSAGE = encodeURIComponent("Hi Miss Yellospace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?")
  return (
    <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,215,0,0.08)', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="section-title" style={{ margin: '0 auto 14px' }}>
            Ready to Transform Your <span className="gradient-text">Digital Future?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto 36px' }}>
            Let's start with a free, no-obligation strategy session to explore how we can accelerate your growth.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/917993927711?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get Free Consultation <FaArrowRight style={{ fontSize: 12 }} />
            </a>
            <Link to="/services" className="btn-outline">Explore Services</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SubPageBg />
      <PageHero />
      <Marquee />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <AboutCTA />
    </main>
  )
}
