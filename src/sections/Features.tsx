import { Check } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { Button } from '../components/Button'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function HouseboatFeature() {
  const { t, state, dispatch } = useApp()
  const selected = state.houseboat

  const handleAdd = () => {
    dispatch({ type: 'ADD_FEATURE', feature: 'houseboat' })
  }

  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <ResponsiveImage
              stem="06-houseboat-slow-living"
              alt={t.houseboat.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-semibold leading-tight text-ink mb-5">
              {t.houseboat.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-7">{t.houseboat.body}</p>

            <ul className="space-y-2.5 mb-7">
              {t.houseboat.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-ink">
                  <div className="w-1.5 h-1.5 rounded-full bg-copper mt-2.5 shrink-0" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-muted italic mb-8">{t.houseboat.note}</p>

            <Button
              variant={selected ? 'secondary' : 'primary'}
              size="lg"
              onClick={handleAdd}
              disabled={selected}
              className="flex items-center gap-2"
            >
              <Check size={18} className={selected ? 'block' : 'hidden'} />
              {t.houseboat.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MotorcycleFeature() {
  const { t, state, dispatch } = useApp()
  const selected = state.motorcycle

  const handleAdd = () => {
    dispatch({ type: 'ADD_FEATURE', feature: 'motorcycle' })
  }

  return (
    <section className="relative py-20 md:py-28 bg-forest overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <ResponsiveImage
          stem="08-motorcycle-mountains"
          alt=""
          sizes="100vw"
          className="w-full h-full"
          objectPosition="center 40%"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/60" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-sage/70 font-medium mb-4">
            {t.motorcycle.eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ivory mb-5">
            {t.motorcycle.title}
          </h2>
          <p className="text-sage/80 text-lg leading-relaxed mb-6">{t.motorcycle.body}</p>

          <div className="bg-ivory/10 rounded-2xl p-5 mb-6 space-y-2">
            <p className="text-ivory font-semibold">{t.motorcycle.guide}</p>
            <p className="text-sage/70 text-sm">{t.motorcycle.support}</p>
          </div>

          <div className="mb-3">
            <span className="text-sage/50 text-xs uppercase tracking-widest">{t.motorcycle.routeLabel}</span>
            <p className="text-ivory font-medium mt-1">{t.motorcycle.route}</p>
          </div>

          <p className="text-sage/50 text-xs italic mb-8">{t.motorcycle.note}</p>

          <Button
            variant="ivory"
            size="lg"
            onClick={handleAdd}
            disabled={selected}
            className="flex items-center gap-2"
          >
            <Check size={18} className={selected ? 'block' : 'hidden'} />
            {t.motorcycle.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
