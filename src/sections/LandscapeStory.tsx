import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useApp } from '../app/AppContext'
import { ResponsiveImage } from '../components/ResponsiveImage'

gsap.registerPlugin(ScrollTrigger)

export function LandscapeStory() {
  const { t } = useApp()
  const containerRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 1023px)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      },
      ctx => {
        const { desktop } = ctx.conditions as { desktop: boolean }

        if (!desktop) return

        const chapters = containerRef.current?.querySelectorAll('.landscape-chapter')
        if (!chapters) return

        // Crossfade images
        chapters.forEach((chapter, i) => {
          ScrollTrigger.create({
            trigger: chapter,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => {
              setActiveChapter(i)
              imagesRef.current.forEach((img, j) => {
                gsap.to(img, { opacity: j === i ? 1 : 0, duration: 0.4, ease: 'power2.out' })
              })
              // Update progress line
              if (lineRef.current) {
                gsap.to(lineRef.current, {
                  height: `${((i + 1) / chapters.length) * 100}%`,
                  duration: 0.3,
                })
              }
            },
            onEnterBack: () => {
              setActiveChapter(i)
              imagesRef.current.forEach((img, j) => {
                gsap.to(img, { opacity: j === i ? 1 : 0, duration: 0.4, ease: 'power2.out' })
              })
            },
          })
        })
      }
    )

    return () => mm.revert()
  }, { scope: containerRef, dependencies: [t], revertOnUpdate: true })

  const chapters = t.landscapes.chapters

  return (
    <section id="landscapes" className="bg-forest scroll-mt-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="px-6 md:px-12 pt-36 md:pt-48 pb-12 md:pb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-sage/70 font-medium mb-4">
            {t.landscapes.eyebrow}
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ivory">
              {t.landscapes.title}
            </h2>
            <p className="text-sage/80 text-lg leading-relaxed self-end">
              {t.landscapes.intro}
            </p>
          </div>
        </div>

        {/* Story layout */}
        <section ref={containerRef} className="relative">
          {/* Desktop: sticky image + scrolling text */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] min-h-[300vh]">
            {/* Sticky image pane — inline styles bypass Tailwind v4 svh compilation issues;
                top: 5rem starts below the 80px nav so the full visible area is filled */}
            <div
              className="sticky overflow-hidden"
              style={{ top: '5rem', height: 'calc(100vh - 5rem)' }}
              aria-hidden="true"
            >
              {chapters.map((chapter, i) => (
                <div
                  key={chapter.id}
                  ref={el => { imagesRef.current[i] = el }}
                  className={`absolute inset-0 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <ResponsiveImage
                    stem={chapter.image}
                    alt=""
                    sizes="50vw"
                    className="w-full h-full"
                    objectPosition="center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest/30 to-transparent" />
                </div>
              ))}
            </div>

            {/* Scrolling chapters */}
            <div className="px-12 xl:px-16 py-12">
              {/* Progress line */}
              <div className="relative flex gap-8">
                <div className="relative w-px bg-ivory/10 shrink-0 my-4">
                  <div
                    ref={lineRef}
                    className="absolute top-0 left-0 w-full bg-copper transition-all"
                    style={{ height: '33%' }}
                  />
                </div>

                <div className="flex flex-col">
                  {chapters.map((chapter, i) => (
                    <div
                      key={chapter.id}
                      className={`landscape-chapter lg:flex lg:flex-col lg:justify-center py-16 xl:py-20 ${i < chapters.length - 1 ? 'border-b border-ivory/10' : ''}`}
                      style={{ minHeight: 'calc(100vh - 5rem)' }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className={`text-xs font-bold tracking-widest ${activeChapter === i ? 'text-copper' : 'text-ivory/30'}`}>
                          0{i + 1}
                        </span>
                        <span className="text-xs text-sage/50 tracking-wide">{chapter.place}</span>
                      </div>
                      <h3 className="text-[clamp(1.8rem,3vw,3.2rem)] font-semibold leading-tight text-ivory mb-5">
                        {chapter.title}
                      </h3>
                      <p className="text-sage/80 text-lg leading-relaxed max-w-md">
                        {chapter.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/tablet: stacked image + text blocks */}
          <div className="lg:hidden space-y-0">
            {chapters.map((chapter, i) => (
              <div key={chapter.id} className={`${i < chapters.length - 1 ? 'border-b border-ivory/10' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <ResponsiveImage
                    stem={chapter.image}
                    alt={chapter.place}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                </div>
                <div className="px-6 md:px-12 py-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold tracking-widest text-copper">0{i + 1}</span>
                    <span className="text-xs text-sage/50 tracking-wide">{chapter.place}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-ivory mb-4">{chapter.title}</h3>
                  <p className="text-sage/80 text-lg leading-relaxed">{chapter.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-6 md:px-12 pb-20 md:pb-28" />
      </div>
    </section>
  )
}
