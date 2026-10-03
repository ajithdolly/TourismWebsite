import { useApp } from '../app/AppContext'

export function Intro() {
  const { t } = useApp()

  return (
    <section id="your-way" className="py-24 md:py-32 intro-section-bg scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
              {t.intro.eyebrow}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-ink">
              {t.intro.title}
            </h2>
          </div>
          <div>
            <p className="text-lg text-muted leading-relaxed mb-10">
              {t.intro.body}
            </p>
            <ol className="space-y-5">
              {t.intro.promise.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center text-sm font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-ink font-medium text-lg leading-snug pt-1">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
