import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const WA_NUMBER = '917993927711'
const WA_MESSAGE = encodeURIComponent(
  "Hi Miss Yellospace Team!\n\nI'm interested in your digital marketing services and would like to learn more about how you can help my business grow.\n\nCould you please provide more information about your offerings?"
)

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        right: '30px', 
        left: 'auto', 
        width: '58px',
        height: '58px', 
        zIndex: 999999 
      }}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: '70px', right: 0,
              background: '#0d0f28', color: '#fff',
              padding: '12px 18px', borderRadius: '12px',
              fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Chat with Miss Yellospace on WhatsApp!
            <div style={{
              position: 'absolute', bottom: -6, right: 20,
              width: 12, height: 12, background: '#0d0f28',
              transform: 'rotate(45deg)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%',
          background: '#25D366',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.45)',
          color: '#fff', fontSize: 28,
        }}
      >
        <FaWhatsapp />
      </motion.a>
    </div>
  )
}
