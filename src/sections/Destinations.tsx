import { MapPin, Check } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function Destinations() {
  const { t, state, dispatch } = useApp()

  const isSelected = (id: string) => state.destinations.includes(id)

  const toggle = (id: string) => {
    dispatch({ type: 'TOGGLE_DESTINATION', id })
  }

  return (
    <section id="destinations" className="py-20 md:py-28 bg-ivory scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
            {t.destinations.eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink max-w-xl">
            {t.destinations.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.destinations.items.map(dest => {
            const selected = isSelected(dest.id)
            return (
              <article
                key={dest.id}
                className={`rounded-3xl overflow-hidden bg-paper border transition-all duration-200 ${
                  selected
                    ? 'border-forest ring-2 ring-forest/20 shadow-lg'
                    : 'border-mist hover:border-forest/30 hover:shadow-sm'
                }`}
              >
                {dest.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <ResponsiveImage
                      stem={dest.image}
                      alt={dest.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`transition-transform duration-300 hover:scale-[1.02]`}
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-mist flex items-center justify-center">
                    <MapPin size={32} className="text-muted/40" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-semibold text-ink text-lg mb-1.5">{dest.name}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">{dest.body}</p>

                  <button
                    onClick={() => toggle(dest.id)}
                    aria-pressed={selected}
                    className={`flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 transition-all duration-150 cursor-pointer min-h-[44px] ${
                      selected
                        ? 'bg-forest text-ivory'
                        : 'border border-forest/40 text-forest hover:bg-forest hover:text-ivory'
                    }`}
                  >
                    <Check size={15} className={selected ? 'block' : 'hidden'} />
                    <MapPin size={15} className={selected ? 'hidden' : 'block'} />
                    {t.destinations.add}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
