import { useEffect, useState } from 'react'
import { useApp } from '../app/AppContext'
import { Button } from '../components/Button'

export function MobileBottomCTA() {
  const { t } = useApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const hero = document.getElementById('home')
      const plan = document.getElementById('plan')
      if (!hero || !plan) return

      const heroBottom = hero.getBoundingClientRect().bottom
      const planTop = plan.getBoundingClientRect().top
      const inPlan = planTop < window.innerHeight * 0.8

      setVisible(heroBottom < 0 && !inPlan)
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe bg-ivory/90 backdrop-blur-sm border-t border-mist md:hidden">
      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {t.nav.plan}
      </Button>
    </div>
  )
}
