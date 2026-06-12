import React from 'react'

export default function ContentHalo({ children, className = '', ringCount = 3 }) {
  const rings = Array.from({ length: ringCount })
  return (
    <div className={`content-halo ${className}`}>
      <div className="content-halo__rings" aria-hidden="true">
        {rings.map((_, i) => (
          <div key={i} className={`content-halo__ring ring-${i}`} />
        ))}
      </div>
      <div className="content-halo__content">{children}</div>
    </div>
  )
}
