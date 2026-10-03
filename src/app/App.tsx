import { useEffect } from 'react'
import { AppProvider } from './AppContext'
import { Nav } from '../sections/Nav'
import { Hero } from '../sections/Hero'
import { Intro } from '../sections/Intro'
import { LandscapeStory } from '../sections/LandscapeStory'
import { Experiences } from '../sections/Experiences'
import { HouseboatFeature, MotorcycleFeature } from '../sections/Features'
import { Destinations } from '../sections/Destinations'
import { Journeys } from '../sections/Journeys'
import { WhyUs, Responsible, FAQ } from '../sections/WhyUs'
import { JourneyPlanner } from '../sections/JourneyPlanner'
import { Footer } from '../sections/Footer'
import { MobileBottomCTA } from '../components/MobileBottomCTA'
import { JourneySummaryModal } from '../components/JourneySummaryModal'

function AppInner() {
  useEffect(() => {
    // Chrome queues scroll restoration in a RAF after load, overriding the
    // synchronous scrollTo(0,0) in main.tsx. Two RAFs guarantee we fire last.
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        if (window.scrollY > 0) window.scrollTo(0, 0)
      })
    })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <div className="reveal-section"><Intro /></div>
        <LandscapeStory />
        <div className="reveal-section"><Experiences /></div>
        <div className="reveal-section"><HouseboatFeature /></div>
        <div className="reveal-section"><MotorcycleFeature /></div>
        <div className="reveal-section"><Destinations /></div>
        <div className="reveal-section"><Journeys /></div>
        <WhyUs />
        <div className="reveal-section"><Responsible /></div>
        <div className="reveal-section"><FAQ /></div>
        <JourneyPlanner />
      </main>
      <Footer />
      <MobileBottomCTA />
      <JourneySummaryModal />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
