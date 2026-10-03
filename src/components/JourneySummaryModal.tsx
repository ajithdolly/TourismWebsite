import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Mail, ArrowLeft, Check } from 'lucide-react'
import { useApp } from '../app/AppContext'

export function JourneySummaryModal() {
  const { t, state, dispatch } = useApp()
  const isOpen = state.summaryOpen

  const selectedCards = t.experiences.cards.filter(c =>
    state.interestGroups.includes(c.id)
  )

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_SUMMARY' })
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, dispatch])

  const buildMailto = () => {
    const list = selectedCards.map(c => `• ${c.title}`).join('\n')
    const body = [
      t.summary.emailGreeting,
      '',
      t.summary.emailIntro,
      '',
      list,
      '',
      t.summary.emailClosing,
      '',
      t.summary.emailSign,
    ].join('\n')

    const subject = encodeURIComponent(t.summary.emailSubject)
    const bodyEncoded = encodeURIComponent(body)
    return `mailto:hello@badentobackwaters.de?subject=${subject}&body=${bodyEncoded}`
  }

  const modal = (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => dispatch({ type: 'CLOSE_SUMMARY' })}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(21, 46, 39, 0.55)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.summary.title}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 201,
          width: '100%',
          maxWidth: 480,
          background: '#FFFDF7',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E3E8DF',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A85031', marginBottom: 4 }}>
              {selectedCards.length > 0
                ? `${selectedCards.length} ${selectedCards.length === 1 ? (t.locale === 'de' ? 'Erlebnis' : 'experience') : (t.locale === 'de' ? 'Erlebnisse' : 'experiences')}`
                : t.summary.subtitle}
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#152E27', margin: 0 }}>
              {t.summary.title}
            </h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_SUMMARY' })}
            aria-label={t.summary.edit}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              border: 'none',
              background: '#E3E8DF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#52685E',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content — scrollable list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selectedCards.length === 0 ? (
              <li style={{ color: '#52685E', fontSize: 15, lineHeight: 1.6 }}>
                {t.summary.empty}
              </li>
            ) : selectedCards.map(card => (
              <li
                key={card.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '1rem 1.25rem',
                  borderRadius: 16,
                  background: '#F6F4EC',
                  border: '1px solid #E3E8DF',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#12372E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  <Check size={16} color="#F6F4EC" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#152E27', margin: '0 0 4px', fontSize: 15 }}>
                    {card.title}
                  </p>
                  <p style={{ color: '#52685E', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid #E3E8DF',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flexShrink: 0,
          background: '#FFFDF7',
        }}>
          <a
            href={selectedCards.length > 0 ? buildMailto() : undefined}
            onClick={selectedCards.length === 0 ? e => e.preventDefault() : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '0.9rem 1.5rem',
              borderRadius: 999,
              background: selectedCards.length > 0 ? '#12372E' : '#A0ADA9',
              color: '#F6F4EC',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              cursor: selectedCards.length > 0 ? 'pointer' : 'default',
              transition: 'background 0.15s',
              pointerEvents: selectedCards.length === 0 ? 'none' : 'auto',
            }}
          >
            <Mail size={17} />
            {t.summary.send}
          </a>

          <button
            onClick={() => dispatch({ type: 'CLOSE_SUMMARY' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '0.75rem 1.5rem',
              borderRadius: 999,
              border: '1px solid #E3E8DF',
              background: 'transparent',
              color: '#52685E',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F6F4EC')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <ArrowLeft size={15} />
            {t.summary.edit}
          </button>
        </div>
      </div>
    </>
  )

  return createPortal(modal, document.body)
}
