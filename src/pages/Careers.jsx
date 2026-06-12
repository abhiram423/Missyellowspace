import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'
import SubPageBg from '../components/SubPageBg'
import ParticleField from '../components/ParticleField'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }

export default function Careers() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <SubPageBg />

      {/* Page hero */}
      <section style={{
        position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden',
        minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {[
          { size: 500, top: '-20%', right: '-5%', color: 'var(--orb-1)' },
          { size: 400, bottom: '-10%', left: '-5%', color: 'var(--orb-2)' },
        ].map((orb, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: i * 4 }}
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
            <motion.span variants={fadeUp} className="section-tag">Careers at Miss Yellowspace</motion.span>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.08, letterSpacing: '-2px',
              color: 'var(--text-primary)', marginBottom: 20,
            }}>
              Join Our <span className="gradient-text">Team</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="section-subtitle" style={{ margin: '0 auto' }}>
              We're always looking for passionate people who want to make a real impact in the digital world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* No open positions card */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,215,0,0.08)', position: 'relative', zIndex: 1 }}>
        <ParticleField count={40} style={{ opacity: 0.5 }} />
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              maxWidth: 560, margin: '0 auto',
              background: 'var(--bg-card)', border: '1px solid rgba(255,215,0,0.12)',
              borderRadius: 28, padding: '56px 40px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 80, height: 80, margin: '0 auto 28px',
                background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 34,
              }}
            >
              📋
            </motion.div>

            <h2 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 800,
              fontSize: 'clamp(22px, 3.5vw, 30px)', letterSpacing: '-0.8px',
              color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2,
            }}>
              No Open Positions<br />at the Moment.
            </h2>
            <p style={{
              fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8,
              marginBottom: 36, maxWidth: 400, margin: '0 auto 36px',
            }}>
              Check back later — or send us your resume and we'll reach out when a great opportunity comes up.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="mailto:Missyellowspace@gmail.com?subject=Open Application – Miss Yellowspace&body=Hi Miss Yellowspace Team,%0D%0A%0D%0AI'd love to join your team! Here's a bit about me:%0D%0A%0D%0AName:%0D%0ARole I'd be great at:%0D%0AExperience:%0D%0APortfolio/LinkedIn:%0D%0A%0D%0ALooking forward to hearing from you!"
                className="btn-primary"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: 15, padding: '15px 32px' }}
              >
                <FaEnvelope style={{ fontSize: 13 }} /> Send Your Resume
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/yellowspace"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: 15 }}
              >
                <FaLinkedin style={{ fontSize: 15 }} /> Follow on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
