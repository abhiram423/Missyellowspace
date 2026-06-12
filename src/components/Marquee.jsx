const ITEMS = [
  'Performance Marketing', 'Social Media Marketing', 'SEO Mastery',
  'Digital Marketing', 'Graphic Designing', 'Branding & Animations',
  'Lead Generation', 'Google Ads', 'Content Strategy', 'Conversion Optimisation',
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS] // duplicate for seamless loop

  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--accent)',
      padding: '13px 0',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marqueeScroll 38s linear infinite',
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
      }}>
        {track.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 12.5,
            fontWeight: 800,
            color: '#07091a',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            padding: '0 28px',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ fontSize: 8, opacity: 0.45 }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translate3d(0, 0, 0) }
          to   { transform: translate3d(-50%, 0, 0) }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
