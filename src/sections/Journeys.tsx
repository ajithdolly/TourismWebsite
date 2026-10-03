import { ArrowRight } from 'lucide-react'
import { useApp } from '../app/AppContext'

export function Journeys() {
  const { t, state, dispatch } = useApp()

  const durationValues: Record<string, string> = {
    '7 days': '7', '7 Tage': '7',
    '10 days': '10', '10 Tage': '10',
    '14 days': '14', '14 Tage': '14',
    '21 days': '21', '21 Tage': '21',
    'Custom': 'custom', 'Individuell': 'custom',
  }

  const handleJourneySelect = (id: string) => {
    const suggestedDays = id === 'essential' ? '7' : id === 'experience' ? '10' : undefined
    dispatch({ type: 'SET_JOURNEY', id, suggestedDays })
  }

  const handleDurationSelect = (opt: string) => {
    const val = durationValues[opt] || opt
    dispatch({ type: 'SET_DURATION', days: val })
  }

  const selectedDay = state.days

  return (
    <section id="journeys" className="py-20 md:py-28 bg-paper scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Duration */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
            {t.duration.eyebrow}
          </p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-8">
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink">
              {t.duration.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed self-end">{t.duration.body}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {t.duration.options.map(opt => {
              const val = durationValues[opt] || opt
              const active = selectedDay === val
              return (
                <button
                  key={opt}
                  onClick={() => handleDurationSelect(opt)}
                  aria-pressed={active}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer min-h-[44px] ${
                    active
                      ? 'bg-forest text-ivory border-forest'
                      : 'border-forest/30 text-forest hover:border-forest hover:bg-forest/5'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          <p className="text-muted text-sm mt-4 italic">{t.duration.note}</p>
        </div>

        {/* Journey ideas */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
            {t.journeys.eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink mb-10">
            {t.journeys.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {t.journeys.items.map(item => {
              const selected = state.journeyId === item.id
              return (
                <article
                  key={item.id}
                  className={`rounded-3xl border p-7 flex flex-col transition-all duration-200 ${
                    selected
                      ? 'border-forest bg-forest text-ivory shadow-lg'
                      : 'border-mist bg-paper hover:border-forest/40 hover:shadow-sm'
                  }`}
                >
                  <div className="mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${selected ? 'text-sage/70' : 'text-copper'}`}>
                      {item.duration}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-semibold mb-3 ${selected ? 'text-ivory' : 'text-ink'}`}>
                    {item.name}
                  </h3>
                  <p className={`text-base leading-relaxed mb-4 ${selected ? 'text-sage/80' : 'text-muted'}`}>
                    {item.body}
                  </p>
                  <p className={`text-sm font-medium mb-2 ${selected ? 'text-sage' : 'text-forest'}`}>
                    {item.highlights}
                  </p>
                  <p className={`text-xs italic mb-6 ${selected ? 'text-sage/50' : 'text-muted'}`}>
                    {item.note}
                  </p>
                  <button
                    onClick={() => handleJourneySelect(item.id)}
                    aria-pressed={selected}
                    className={`mt-auto flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-all duration-150 cursor-pointer self-start min-h-[44px] ${
                      selected
                        ? 'bg-ivory text-forest hover:bg-paper'
                        : 'bg-forest text-ivory hover:bg-ink'
                    }`}
                  >
                    {t.journeys.cta}
                    <ArrowRight size={15} />
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        {/* Price footnote */}
        <p id="price-footnote" className="mt-12 text-xs text-muted/70 italic leading-relaxed max-w-2xl">
          {t.price.footnote}
        </p>
      </div>
    </section>
  )
}
