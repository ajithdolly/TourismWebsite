import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { Button } from '../components/Button'
import { LanguageSwitch } from '../components/LanguageSwitch'

export function Nav() {
  const { t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Focus trap in mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    focusable[0]?.focus()
  }, [menuOpen])

  const navLinks = [
    { href: '#experiences', label: t.nav.experiences },
    { href: '#journeys', label: t.nav.journeys },
    { href: '#why-us', label: t.nav.whyUs },
  ]

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">{t.nav.skip}</a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm border-b border-mist shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center h-20">
          {/* Brand — only visible once nav has a background (on scroll) */}
          <div className="flex-1">
            <a
              href="#home"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className={`font-bold text-lg tracking-tight transition-all duration-200 ${
                scrolled ? 'text-forest opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              Baden to Backwaters
            </a>
          </div>

          {/* Desktop nav links — truly centered because both siblings are flex-1 */}
          <nav className="hidden md:flex items-center gap-8 shrink-0" aria-label="Main navigation">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${scrolled ? 'text-ink' : 'text-ivory/90'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right controls — flex-1 + justify-end mirrors brand side */}
          <div className="flex-1 flex items-center gap-3 justify-end">
            <LanguageSwitch className={scrolled ? 'border-mist text-ink' : 'border-ivory/40 text-ivory'} />
            <div className="hidden md:flex">
              <Button
                variant={scrolled ? 'primary' : 'ivory'}
                size="sm"
                onClick={() => handleNavClick('#plan')}
              >
                {t.nav.plan}
              </Button>
            </div>
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.open}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${scrolled ? 'text-forest hover:bg-mist' : 'text-ivory hover:bg-ivory/10'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-ink/70 md:hidden"
          aria-hidden="true"
          onClick={() => { setMenuOpen(false); menuButtonRef.current?.focus() }}
        />
      )}

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-full bg-paper shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist">
          <span className="font-bold text-forest text-lg">Baden to Backwaters</span>
          <button
            onClick={() => { setMenuOpen(false); menuButtonRef.current?.focus() }}
            aria-label={t.nav.close}
            className="p-2 rounded-full text-muted hover:bg-mist transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-1 flex-1" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNavClick(link.href); menuButtonRef.current?.focus() }}
              className="py-3 px-4 rounded-xl text-ink font-medium hover:bg-mist hover:text-forest transition-colors text-lg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="p-6 border-t border-mist">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => { handleNavClick('#plan'); menuButtonRef.current?.focus() }}
          >
            {t.nav.plan}
          </Button>
        </div>
      </div>
    </>
  )
}
