import { CheckCircle } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Accordion } from '../components/Accordion'

export function WhyUs() {
  const { t } = useApp()

  return (
    <section id="why-us" className="scroll-mt-20">
      {/* Guide statement */}
      <div className="bg-forest py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-sage/60 font-medium mb-4">
                {t.guide.eyebrow}
              </p>
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ivory mb-6">
                {t.guide.title}
              </h2>
              <p className="text-sage/80 text-lg leading-relaxed mb-10">{t.guide.body}</p>
              <p className="text-ivory/50 text-sm italic">{t.guide.closing}</p>
            </div>

            <div>
              <ul className="space-y-4">
                {t.guide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle size={20} className="text-copper shrink-0 mt-0.5" />
                    <span className="text-sage/80 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Germany / Kerala two columns */}
      <div className="bg-ivory py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
              {t.whyUs.eyebrow}
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink max-w-xl">
              {t.whyUs.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Germany */}
            <div className="bg-paper rounded-3xl p-8 border border-mist">
              <h3 className="font-semibold text-ink text-xl mb-5">{t.whyUs.germanyTitle}</h3>
              <ul className="space-y-3">
                {t.whyUs.germany.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-forest shrink-0" />
                    <span className="text-ink text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kerala */}
            <div className="bg-forest rounded-3xl p-8">
              <h3 className="font-semibold text-ivory text-xl mb-5">{t.whyUs.keralaTitle}</h3>
              <ul className="space-y-3">
                {t.whyUs.kerala.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-copper shrink-0" />
                    <span className="text-sage/80 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-muted text-lg text-center italic">{t.whyUs.closing}</p>
        </div>
      </div>

      {/* Process timeline */}
      <div className="bg-mist py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-tight text-ink mb-12 text-center">
            {t.process.title}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, i) => (
              <div key={step.id} className="relative">
                <div className="bg-paper rounded-3xl p-7 h-full border border-mist/60">
                  <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center text-sm font-bold mb-5">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-ink text-lg mb-3">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inclusions */}
      <div className="bg-ivory py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
                {t.inclusions.eyebrow}
              </p>
              <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-semibold leading-tight text-ink mb-4">
                {t.inclusions.title}
              </h2>
              <p className="text-muted leading-relaxed mb-4">{t.inclusions.body}</p>
              <p className="text-xs text-muted/70 italic">{t.inclusions.note}</p>
            </div>
            <div>
              <ul className="space-y-3">
                {t.inclusions.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-forest shrink-0 mt-0.5" />
                    <span className="text-ink text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Responsible() {
  const { t } = useApp()

  return (
    <section className="py-20 md:py-24 bg-paper">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="rounded-3xl overflow-hidden aspect-[3/2]">
            <ResponsiveImage
              stem="07-wild-elephants"
              alt={t.responsible.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              objectPosition="center 60%"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
              {t.responsible.eyebrow}
            </p>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-semibold leading-tight text-ink mb-5">
              {t.responsible.title}
            </h2>
            <p className="text-muted leading-relaxed mb-4">{t.responsible.body}</p>
            <p className="text-muted leading-relaxed mb-4 text-sm">{t.responsible.wildlife}</p>
            <p className="text-ink font-medium italic">{t.responsible.closing}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const { t } = useApp()

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        <h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold leading-tight text-ink mb-12 max-w-lg">
          {t.faq.title}
        </h2>
        <Accordion items={t.faq.items} />
      </div>
    </section>
  )
}
