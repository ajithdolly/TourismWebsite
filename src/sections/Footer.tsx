import { ArrowUp } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { LanguageSwitch } from '../components/LanguageSwitch'

export function Footer() {
  const { t } = useApp()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '#experiences', label: t.nav.experiences },
    { href: '#journeys', label: t.nav.journeys },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#plan', label: t.nav.plan },
  ]

  return (
    <footer className="bg-forest text-ivory pt-16 md:pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-16 items-start pb-12 border-b border-ivory/10">
          {/* Brand */}
          <div className="space-y-3 max-w-xs">
            <p className="font-bold text-xl text-ivory">Baden to Backwaters</p>
            <p className="text-sage/70 text-sm leading-relaxed">{t.footer.tagline}</p>
            <p className="text-sage/50 text-sm">{t.footer.brandline}</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center" aria-label="Footer navigation">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-sm text-sage/70 hover:text-ivory transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language + top */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <LanguageSwitch className="border-ivory/20 text-ivory" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-sm text-sage/60 hover:text-ivory transition-colors cursor-pointer"
              aria-label={t.footer.backToTop}
            >
              <ArrowUp size={14} />
              {t.footer.backToTop}
            </button>
          </div>
        </div>

        {/* Closing line */}
        <p className="text-center text-sage/40 text-base font-medium py-8 border-b border-ivory/10">
          {t.footer.closing}
        </p>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-sage/40">
          <p>{t.footer.copyright.replace('{year}', String(year))}</p>

          <div className="flex gap-4">
            <a href="/legal" className="hover:text-ivory transition-colors">{t.footer.legal}</a>
            <a href="/privacy" className="hover:text-ivory transition-colors">{t.footer.privacy}</a>
            <a
              href="#plan"
              onClick={e => { e.preventDefault(); document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="hover:text-ivory transition-colors"
            >
              {t.footer.contact}
            </a>
          </div>
        </div>

        {/* Image note */}
        <p className="mt-4 text-xs text-sage/30 italic leading-relaxed">{t.footer.imageNote}</p>
      </div>
    </footer>
  )
}
