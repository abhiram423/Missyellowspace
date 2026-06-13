import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import yellowspaceLogo from '../assets/yellowspace_image.png'
import {
  FaChevronDown, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaFacebook, FaTwitter,
  FaSearch, FaShareAlt, FaChartLine, FaCode, FaPalette,
  FaMobile, FaBullhorn, FaMagic, FaWhatsapp,
} from 'react-icons/fa'

/* ── Nav data ── */
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
]

const SERVICES_DROPDOWN = [
  { label: 'Performance Marketing', icon: FaChartLine, slug: 'performance-marketing' },
  { label: 'Social Media Marketing', icon: FaShareAlt, slug: 'social-media-marketing' },
  { label: 'SEO', icon: FaSearch, slug: 'seo' },
  { label: 'Digital Marketing', icon: FaBullhorn, slug: 'digital-marketing' },
  { label: 'Graphic Designing', icon: FaPalette, slug: 'graphic-designing' },
  { label: 'Branding and Animations', icon: FaMagic, slug: 'branding-and-animations' },
]

const SOCIAL_LINKS = [
  { Icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61582036891587', label: 'Facebook', color: '#1877F2' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/missyellowspace?igsh=MXY1dGlkdnR3aHJ2dA==', label: 'Instagram', color: '#E1306C' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/missyellowworkspace/', label: 'LinkedIn', color: '#0A66C2' },
  { Icon: FaWhatsapp, href: 'https://wa.me/917993927711', label: 'WhatsApp', color: '#25D366' },]

/* ── Yellowspace Logo Image ── */
function YellowspaceLogo({ size = 52 }) {
  return (
    <img src={yellowspaceLogo} alt="Yellowspace Logo" style={{ width: size, height: size, objectFit: 'contain' }} />
  )
}

/* ── 9-dots grid icon ── */
function DotsGrid({ active }) {
  const color = active ? '#FFD700' : 'var(--text-secondary)'
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 5px)', gap: '3.5px' }}>
      {Array(9).fill(0).map((_, i) => (
        <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: color, transition: 'background 0.2s' }} />
      ))}
    </div>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false)

  const servicesRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    setGridOpen(false)
    setMobileSvcOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!servicesOpen && !gridOpen) return
    const onOutside = (e) => {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false)
      if (gridOpen && gridRef.current && !gridRef.current.contains(e.target)) setGridOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [servicesOpen, gridOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setServicesOpen(false); setGridOpen(false) } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const isServicesActive = pathname === '/services'

  const navBg = scrolled
    ? 'rgba(6,8,26,0.96)'
    : 'transparent'

  const linkStyle = (active) => ({
    position: 'relative', padding: '9px 14px', fontSize: 15,
    fontWeight: active ? 700 : 500,
    color: active ? '#FFD700' : 'var(--text-secondary)',
    borderRadius: 50, transition: 'color 0.2s', whiteSpace: 'nowrap',
    fontFamily: 'var(--font-sans)',
  })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: navBg,
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,215,0,0.12)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 74 : 94, transition: 'height 0.3s',
        gap: 10,
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
            <YellowspaceLogo size={52} />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#edf0f8', marginRight: '8px' }}>Miss</span>
              <span style={{ color: '#FFD700' }}>Yellowspace</span>
            </span>
          </div>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <div id="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map(({ label, to }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to} style={linkStyle(active)}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#FFD700' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {label}
                {active && (
                  <motion.div layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 50, zIndex: -1 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Services with dropdown */}
          <div ref={servicesRef} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
              <Link to="/services" style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '7px 11px', fontSize: 13.5,
                fontWeight: isServicesActive ? 700 : 500,
                color: isServicesActive ? '#FFD700' : 'var(--text-secondary)',
                textDecoration: 'none', borderRadius: 50,
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
                transition: 'color 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { if (!isServicesActive) e.currentTarget.style.color = '#FFD700' }}
                onMouseLeave={e => { if (!isServicesActive) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                Services
              </Link>
              <button
                type="button"
                onClick={() => setServicesOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: 50, border: 'none',
                  background: servicesOpen ? 'rgba(255,215,0,0.12)' : 'transparent',
                  color: servicesOpen ? '#FFD700' : 'var(--text-secondary)',
                  cursor: 'pointer', padding: 0, marginLeft: 2,
                  transition: 'all 0.2s',
                }}
                aria-label="Toggle services dropdown"
              >
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <FaChevronDown style={{ fontSize: 10 }} />
                </motion.span>
              </button>
              {isServicesActive && (
                <motion.div layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 50, zIndex: -1 }}
                />
              )}
            </div>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 12px)',
                    left: '50%', transform: 'translateX(-50%)',
                    width: 252,
                    background: 'rgba(6,8,26,0.97)',
                    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,215,0,0.18)', borderRadius: 16,
                    padding: '8px', boxShadow: '0 16px 50px rgba(0,0,0,0.5)', zIndex: 300,
                  }}
                >
                  {SERVICES_DROPDOWN.map(({ label, icon: Icon, slug }) => (
                    <Link
                      key={label} to={`/services?service=${slug}`}
                      onClick={() => setServicesOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', borderRadius: 10,
                        fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
                        transition: 'all 0.18s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,215,0,0.1)'; e.currentTarget.style.color = '#FFD700' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      <Icon style={{ fontSize: 13, color: '#FFD700', flexShrink: 0 }} />
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: social icons + dots grid ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {/* Social icons — desktop */}
          <div id="social-icons" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.18, y: -2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 34, height: 34,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: 15, transition: 'color 0.2s',
                  borderRadius: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = color }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* 9-dots grid menu */}
          <div ref={gridRef} style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setGridOpen(o => !o)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Quick contact"
              style={{
                width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: gridOpen ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${gridOpen ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <DotsGrid active={gridOpen} />
            </motion.button>

            <AnimatePresence>
              {gridOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.94 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                    width: 300,
                    background: 'rgba(6,8,26,0.97)',
                    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,215,0,0.18)', borderRadius: 20,
                    padding: '18px 16px', boxShadow: '0 16px 50px rgba(0,0,0,0.5)', zIndex: 300,
                  }}
                >
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
                    Contact Us
                  </p>
                  {[
                    { icon: FaPhone, label: 'Phone', value: '+91 79939 27711', href: 'tel:+917993927711', color: '#4CAF50' },
                    { icon: FaEnvelope, label: 'Email', value: 'Missyellowspace@gmail.com', href: 'mailto:info@yellospace.com', color: '#2196F3' },
                    { icon: FaMapMarkerAlt, label: 'Address', value: 'Madhapur, Hyderabad – 500081', href: 'https://maps.google.com/?q=Madhapur+Hyderabad', color: '#FF5722' },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <a key={label} href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.72'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                        background: `${color}18`, border: `1px solid ${color}28`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color, fontSize: 13,
                      }}><Icon /></div>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 3 }}>{label}</p>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>{value}</p>
                      </div>
                    </a>
                  ))}
                  <div style={{ paddingTop: 14 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
                      Follow Us
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                        <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                          whileHover={{ scale: 1.15, y: -2 }}
                          style={{
                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `${color}12`, border: `1px solid ${color}22`,
                            color, fontSize: 15,
                          }}
                        >
                          <Icon />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger — mobile only */}
          <motion.button
            onClick={() => setMobileOpen(o => !o)}
            whileTap={{ scale: 0.9 }}
            id="hamburger"
            aria-label="Toggle menu"
            style={{
              width: 38, height: 38, display: 'none', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, color: 'var(--text-primary)', fontSize: 20, cursor: 'pointer',
            }}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'rgba(6,8,26,0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,215,0,0.12)',
            }}
          >
            <div className="container" style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {NAV_LINKS.map(({ label, to }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={to} style={{
                    display: 'block', padding: '11px 16px', fontSize: 15, borderRadius: 12,
                    fontWeight: pathname === to ? 700 : 500,
                    color: pathname === to ? '#FFD700' : 'var(--text-primary)',
                    background: pathname === to ? 'rgba(255,215,0,0.08)' : 'transparent',
                  }}>{label}</Link>
                </motion.div>
              ))}

              {/* Mobile Services expandable */}
              <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: NAV_LINKS.length * 0.06 }}>
                <button
                  onClick={() => setMobileSvcOpen(o => !o)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '11px 16px', borderRadius: 12, fontSize: 15, background: 'none', border: 'none',
                    fontWeight: isServicesActive ? 700 : 500,
                    color: isServicesActive ? '#FFD700' : 'var(--text-primary)',
                    cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  }}
                >
                  Services
                  <motion.span animate={{ rotate: mobileSvcOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                    <FaChevronDown style={{ fontSize: 12 }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileSvcOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden', paddingLeft: 10 }}
                    >
                      {SERVICES_DROPDOWN.map(({ label, icon: Icon, slug }) => (
                        <Link key={label} to={`/services?service=${slug}`} onClick={() => setMobileOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', fontSize: 14, color: 'var(--text-secondary)', borderRadius: 10 }}
                        >
                          <Icon style={{ color: '#FFD700', fontSize: 12, flexShrink: 0 }} />
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile social */}
              <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px' }}>
                {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}14`, border: `1px solid ${color}22`, borderRadius: 9, color, fontSize: 16 }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #desktop-nav { display: none !important; }
          #social-icons { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (max-width: 1200px) and (min-width: 901px) {
          #desktop-nav a, #desktop-nav button { padding: 6px 8px !important; font-size: 13px !important; }
          #social-icons { gap: 2px !important; }
        }
      `}</style>
    </nav>
  )
}
