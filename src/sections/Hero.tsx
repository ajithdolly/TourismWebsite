import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { Button } from '../components/Button'
import { ResponsiveImage } from '../components/ResponsiveImage'

export function Hero() {
  const { t } = useApp()
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!contentRef.current) return
      const children = contentRef.current.querySelectorAll('.hero-anim')
      gsap.fromTo(
        children,
        { y: 16 },
        { y: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out' }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  const scrollToPlan = () => {
    document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToExperiences = () => {
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[88svh] flex items-end pb-16 md:pb-24 overflow-hidden scroll-mt-20"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <ResponsiveImage
          stem="01-backwaters-hero"
          alt=""
          eager
          objectPosition="62% 50%"
          className="absolute inset-0 w-full h-full"
          sizes="100vw"
        />
        {/* Dark overlay — fades from transparent at top to dark at bottom where text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/10" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 w-full pt-24 md:pt-0">
        <div className="max-w-2xl" ref={contentRef}>
          <p className="hero-anim text-xs uppercase tracking-[0.18em] text-ivory/70 mb-4 font-medium md:pt-8">
            {t.hero.eyebrow}
          </p>
          <h1 className="hero-anim text-[clamp(2.8rem,7.8vw,7.75rem)] font-semibold leading-[1.02] tracking-tight text-ivory mb-4">
            {t.hero.title}
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-ivory/80 font-medium mb-5 leading-snug">
            {t.hero.subtitle}
          </p>
          <p className="hero-anim text-base text-ivory/70 mb-8 leading-relaxed max-w-xl">
            {t.hero.body}
          </p>

          {/* Price / info */}
          <div className="hero-anim mb-8 space-y-1.5">
            <p className="text-ivory font-semibold text-lg">
              {t.hero.price}
            </p>
            <p className="text-ivory/65 text-sm">{t.hero.group}</p>
            <p className="text-ivory/55 text-sm">{t.hero.inclusions}</p>
            <p className="text-ivory/45 text-xs italic">{t.hero.inclusionsNote}</p>
          </div>

          <div className="hero-anim flex flex-wrap gap-3">
            <Button variant="ivory" size="lg" onClick={scrollToPlan}>
              {t.hero.primary}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={scrollToExperiences}
              className="text-ivory/90 hover:bg-ivory/10 border border-ivory/30"
            >
              {t.hero.secondary}
            </Button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-ivory/50">
          <span className="text-xs tracking-widest uppercase writing-vertical rotate-90">{t.hero.scroll}</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </div>

      {/* Footnote anchor */}
      <div id="price-note" />
    </section>
  )
}
