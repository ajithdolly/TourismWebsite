import { Plus, Check } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function Experiences() {
  const { t, state, dispatch } = useApp()

  const isGroupSelected = (id: string) => state.interestGroups.includes(id)

  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE_INTEREST_GROUP', id })
  }

  const openSummary = () => {
    dispatch({ type: 'OPEN_SUMMARY' })
  }

  return (
    <section id="experiences" className="py-20 md:py-28 bg-ivory scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14 md:mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
              {t.experiences.eyebrow}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink">
              {t.experiences.title}
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed">
            {t.experiences.body}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {t.experiences.cards.map((card, i) => {
            const selected = isGroupSelected(card.id)
            return (
              <article
                key={card.id}
                className={`group relative rounded-3xl overflow-hidden bg-paper border transition-all duration-200 flex flex-col ${
                  selected
                    ? 'border-forest ring-2 ring-forest shadow-lg'
                    : 'border-mist hover:border-forest/30 hover:shadow-md'
                } ${i === 0 ? 'lg:col-span-1' : ''}`}
              >
                {/* Image — fixed pixel height, absolute fill so all cards are identical */}
                <div className="relative overflow-hidden shrink-0" style={{ height: '220px' }}>
                  <ResponsiveImage
                    stem={card.image}
                    alt={card.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`absolute inset-0 transition-transform duration-300 ${selected ? '' : 'group-hover:scale-[1.035]'}`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-ink text-lg mb-2">{card.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{card.body}</p>

                  <button
                    onClick={() => toggle(card.id)}
                    aria-pressed={selected}
                    className={`mt-auto self-start flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 transition-all duration-150 cursor-pointer min-h-[44px] ${
                      selected
                        ? 'bg-forest text-ivory'
                        : 'border border-forest/40 text-forest hover:bg-forest hover:text-ivory'
                    }`}
                  >
                    <Check size={15} className={selected ? 'block' : 'hidden'} />
                    <Plus size={15} className={selected ? 'hidden' : 'block'} />
                    <span>{selected ? t.experiences.added : t.experiences.add}</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA if selections made */}
        {state.interestGroups.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={openSummary}
              className="bg-forest text-ivory px-8 py-4 rounded-full font-semibold text-base hover:bg-ink transition-colors cursor-pointer"
            >
              {t.menu.continue}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
