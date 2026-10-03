import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, Download } from 'lucide-react'
import { useApp } from '../app/AppContext'
import { Button } from '../components/Button'
import { Step1, Step2, Step3 } from './PlannerSteps'

function validateStep3(state: ReturnType<typeof useApp>['state'], t: ReturnType<typeof useApp>['t']) {
  const errors: Record<string, string> = {}
  const v = t.form.validation

  if (!state.name.trim()) errors['name'] = v.required
  if (!state.email.trim()) errors['email'] = v.required
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors['email'] = v.email
  if (!state.consent) errors['consent'] = v.consent

  return errors
}

export function JourneyPlanner() {
  const { t, state, dispatch, draftRestored, dismissDraftBanner } = useApp()
  const f = t.form
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)
  const currentStep = state.step

  // Focus step heading when step changes
  useEffect(() => {
    stepHeadingRef.current?.focus()
  }, [currentStep])

  const goNext = () => {
    dispatch({ type: 'NEXT_STEP' })
    setErrors({})
  }

  const goPrev = () => {
    dispatch({ type: 'PREV_STEP' })
    setErrors({})
  }

  const handleSubmit = async () => {
    const errs = validateStep3(state, t)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErr = document.querySelector('[aria-invalid="true"]') as HTMLElement
      firstErr?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError('')

    // Preview mode — no endpoint configured
    await new Promise(r => setTimeout(r, 400))
    setSubmitting(false)

    // Show demo state
    if (liveRef.current) {
      liveRef.current.textContent = f.demoTitle
    }
  }

  const handleDownload = () => {
    const lines = [
      'Baden to Backwaters — Travel Idea',
      '='.repeat(40),
      '',
      `Dates: ${state.dates || '—'}${state.flexible ? ' (flexible)' : ''}`,
      `Departure: ${state.departure || '—'}`,
      `Duration: ${state.days === 'custom' ? state.customDays : state.days || '—'}`,
      `Travellers: ${state.travellers === 'other' ? state.customTravellers : state.travellers || '—'}`,
      `Party: ${state.party || '—'}`,
      '',
      `Journey: ${t.journeys.items.find(j => j.id === state.journeyId)?.name || '—'}`,
      `Houseboat: ${state.houseboat ? 'Yes' : 'No'}`,
      `Motorcycle: ${state.motorcycle ? 'Yes' : 'No'}`,
      '',
      `Interests: ${state.interestGroups.map(id => t.experiences.cards.find(c => c.id === id)?.title || id).join(', ') || '—'}`,
      `Activities: ${state.interests.join(', ') || '—'}`,
      `Destinations: ${state.destinations.map(id => t.destinations.items.find(d => d.id === id)?.name || id).join(', ') || '—'}`,
      `Accommodation: ${state.accommodation || '—'}`,
      `Budget: ${state.budget ? `€${state.budget}` : '—'}`,
      '',
      `Message: ${state.story || '—'}`,
    ].join('\n')

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-kerala-journey.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const stepLabels = f.steps

  return (
    <section id="plan" className="py-20 md:py-28 bg-paper scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-copper font-medium mb-4">
            {f.eyebrow}
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-semibold leading-[1.08] text-ink">
              {f.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed">{f.intro}</p>
          </div>
        </div>

        {/* Draft banner */}
        {draftRestored && (
          <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl bg-sage/30 border border-sage px-5 py-4">
            <p className="text-sm text-ink">{f.draftRestored}</p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => { dispatch({ type: 'RESET_DRAFT' }); dismissDraftBanner() }}
                className="text-xs text-muted hover:text-copper underline cursor-pointer"
              >
                {f.resetDraft}
              </button>
              <button onClick={dismissDraftBanner} className="text-xs text-muted hover:text-ink cursor-pointer">✕</button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16">
          {/* Step sidebar */}
          <div>
            <nav aria-label="Form steps" className="flex flex-row lg:flex-col gap-2 mb-8 lg:mb-0">
              {stepLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => i < currentStep ? dispatch({ type: 'SET_STEP', step: i }) : undefined}
                  disabled={i > currentStep}
                  aria-current={currentStep === i ? 'step' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-sm font-medium cursor-pointer disabled:cursor-not-allowed ${
                    currentStep === i
                      ? 'bg-forest text-ivory'
                      : i < currentStep
                      ? 'text-forest hover:bg-mist'
                      : 'text-muted/50 pointer-events-none'
                  }`}
                >
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                    i < currentStep
                      ? 'border-forest bg-forest text-ivory'
                      : currentStep === i
                      ? 'border-ivory bg-ivory/20 text-ivory'
                      : 'border-muted/30 text-muted/50'
                  }`}>
                    {i < currentStep ? <CheckCircle2 size={14} /> : i + 1}
                  </span>
                  <span className="hidden lg:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form content */}
          <div>
            <div
              ref={liveRef}
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            />

            <h3
              ref={stepHeadingRef}
              tabIndex={-1}
              className="text-xl font-semibold text-ink mb-6 outline-none"
            >
              {stepLabels[currentStep]}
            </h3>

            {/* Demo notice */}
            <div className="mb-6 rounded-2xl bg-sage/20 border border-sage px-5 py-4">
              <p className="text-sm font-medium text-ink">{f.demoTitle}</p>
              <p className="text-xs text-muted mt-1">{f.demoBody}</p>
            </div>

            {currentStep === 0 && <Step1 />}
            {currentStep === 1 && <Step2 />}
            {currentStep === 2 && <Step3 errors={errors} />}

            {/* Submit error */}
            {submitError && (
              <p className="mt-4 text-sm text-error">{f.error}</p>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {currentStep > 0 ? (
                <button
                  onClick={goPrev}
                  className="text-sm text-muted hover:text-ink font-medium cursor-pointer px-4 py-2 rounded-xl hover:bg-mist transition-colors min-h-[44px]"
                >
                  ← {f.back}
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {currentStep < 2 && (
                  <Button variant="primary" size="md" onClick={goNext}>
                    {f.next} →
                  </Button>
                )}
                {currentStep === 2 && (
                  <>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleDownload}
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      {f.download}
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex items-center gap-2"
                    >
                      {submitting ? f.submitting : f.submit}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Step indicator */}
            <p className="mt-4 text-xs text-muted text-center">
              {t.a11y.step.replace('{current}', String(currentStep + 1)).replace('{total}', '3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
