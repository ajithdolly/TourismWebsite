import { useApp } from '../app/AppContext'
import type { Locale } from '../state/journey'

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useApp()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`flex rounded-full border border-current overflow-hidden text-sm font-semibold ${className}`}
    >
      {(['en', 'de'] as Locale[]).map(lang => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className={`px-3 py-1.5 transition-colors cursor-pointer uppercase tracking-wide ${
            locale === lang
              ? 'bg-forest text-ivory'
              : 'text-muted hover:text-ink hover:bg-mist'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
