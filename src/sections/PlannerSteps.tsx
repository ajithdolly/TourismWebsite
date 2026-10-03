import { useId } from 'react'
import { Check, AlertCircle, ChevronRight } from 'lucide-react'
import { useApp } from '../app/AppContext'

// ── Step 1: Trip basics ──────────────────────────────────────────

export function Step1() {
  const { t, state, dispatch } = useApp()
  const id = useId()
  const f = t.form

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    dispatch({ type: 'SET_FIELD', field: field as any, value: e.target.value })

  return (
    <div className="space-y-8">
      {/* Dates */}
      <div>
        <label htmlFor={`${id}-dates`} className="block text-sm font-semibold text-ink mb-2">
          {f.dates} <span className="text-muted font-normal">({f.optional})</span>
        </label>
        <input
          id={`${id}-dates`}
          type="text"
          value={state.dates}
          onChange={set('dates')}
          placeholder={f.datesPlaceholder}
          autoComplete="off"
          className="w-full rounded-xl border border-mist bg-paper px-4 py-3 text-ink placeholder:text-muted/50 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition min-h-[48px]"
        />
        <label className="flex items-center gap-2 mt-3 cursor-pointer text-sm text-muted">
          <input
            type="checkbox"
            checked={state.flexible}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'flexible', value: e.target.checked })}
            className="rounded border-mist text-forest cursor-pointer"
          />
          {f.flexible}
        </label>
      </div>

      {/* Departure */}
      <div>
        <label htmlFor={`${id}-departure`} className="block text-sm font-semibold text-ink mb-2">
          {f.departure} <span className="text-muted font-normal">({f.optional})</span>
        </label>
        <input
          id={`${id}-departure`}
          type="text"
          value={state.departure}
          onChange={set('departure')}
          placeholder="Berlin, München, Frankfurt…"
          autoComplete="off"
          className="w-full rounded-xl border border-mist bg-paper px-4 py-3 text-ink placeholder:text-muted/50 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition min-h-[48px]"
        />
      </div>

      {/* Travellers */}
      <TravellersField id={id} />

      {/* Duration */}
      <DurationField id={id} />

      {/* Party */}
      <div>
        <p className="text-sm font-semibold text-ink mb-3">
          {f.party} <span className="text-muted font-normal">({f.optional})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(f.partyOptions).map(([key, label]) => (
            <button
              key={key}
              onClick={() => dispatch({ type: 'SET_FIELD', field: 'party', value: state.party === key ? '' : key })}
              aria-pressed={state.party === key}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer min-h-[44px] ${
                state.party === key
                  ? 'bg-forest text-ivory border-forest'
                  : 'border-mist text-ink hover:border-forest/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TravellersField({ id: _id }: { id: string }) {
  const { t, state, dispatch } = useApp()
  const f = t.form
  const customId = useId()

  return (
    <div>
      <p className="text-sm font-semibold text-ink mb-3">
        {f.travellers} <span className="text-muted font-normal">({f.optional})</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {f.travellerOptions.map(opt => {
          const isOther = opt === f.travellerOptions[f.travellerOptions.length - 1]
          const active = isOther ? state.travellers === 'other' : state.travellers === opt
          return (
            <button
              key={opt}
              onClick={() => dispatch({ type: 'SET_FIELD', field: 'travellers', value: isOther ? 'other' : opt })}
              aria-pressed={active}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer min-h-[44px] ${
                active ? 'bg-forest text-ivory border-forest' : 'border-mist text-ink hover:border-forest/50'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {state.travellers === 'other' && (
        <div className="mt-3">
          <label htmlFor={`${customId}-custom-t`} className="sr-only">{f.otherTravellers}</label>
          <input
            id={`${customId}-custom-t`}
            type="number"
            min="2"
            value={state.customTravellers}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'customTravellers', value: e.target.value })}
            placeholder={f.otherTravellers}
            className="w-40 rounded-xl border border-mist bg-paper px-4 py-3 text-ink focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition min-h-[48px]"
          />
        </div>
      )}
    </div>
  )
}

function DurationField({ id: _id }: { id: string }) {
  const { t, state, dispatch } = useApp()
  const f = t.form
  const customId = useId()

  const durationValues: Record<string, string> = {
    '7 days': '7', '7 Tage': '7',
    '10 days': '10', '10 Tage': '10',
    '14 days': '14', '14 Tage': '14',
    '21 days': '21', '21 Tage': '21',
    'Custom': 'custom', 'Individuell': 'custom',
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink mb-3">
        {f.days} <span className="text-muted font-normal">({f.optional})</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {t.duration.options.map(opt => {
          const val = durationValues[opt] || opt
          const active = state.days === val
          return (
            <button
              key={opt}
              onClick={() => dispatch({ type: 'SET_FIELD', field: 'days', value: active ? '' : val })}
              aria-pressed={active}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer min-h-[44px] ${
                active ? 'bg-forest text-ivory border-forest' : 'border-mist text-ink hover:border-forest/50'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {state.days === 'custom' && (
        <div className="mt-3">
          <label htmlFor={`${customId}-custom-d`} className="sr-only">{f.customDays}</label>
          <input
            id={`${customId}-custom-d`}
            type="text"
            value={state.customDays}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'customDays', value: e.target.value })}
            placeholder={f.customDaysPlaceholder}
            className="w-56 rounded-xl border border-mist bg-paper px-4 py-3 text-ink focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition min-h-[48px]"
          />
        </div>
      )}
    </div>
  )
}

// ── Step 2: Interests ────────────────────────────────────────────

export function Step2() {
  const { t, state, dispatch } = useApp()
  const f = t.form
  const m = t.menu
  const id = useId()

  const totalSelected = state.interests.length
  const selectedCount = totalSelected > 0 ? m.selected.replace('{count}', String(totalSelected)) : ''

  return (
    <div className="space-y-8">
      {/* Experience categories */}
      <div>
        <p className="text-sm font-semibold text-ink mb-1">{f.interests}</p>
        {selectedCount && <p className="text-xs text-copper mb-4">{selectedCount}</p>}

        <div className="space-y-5">
          {t.menu.categories.map(cat => {
            const catSelectedCount = Object.keys(cat.items).filter(k => state.interests.includes(k)).length
            return (
              <details key={cat.id} className="group border border-mist rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none text-ink font-semibold hover:bg-mist/40 transition-colors">
                  <span>{cat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs bg-forest text-ivory px-2 py-0.5 rounded-full ${catSelectedCount > 0 ? '' : 'hidden'}`}>
                      {catSelectedCount}
                    </span>
                    <ChevronRight size={16} className="text-muted group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="px-5 pb-4 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(cat.items).map(([key, label]) => {
                      const active = state.interests.includes(key)
                      return (
                        <button
                          key={key}
                          onClick={() => dispatch({ type: 'TOGGLE_INTEREST', id: key })}
                          aria-pressed={active}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-all cursor-pointer min-h-[36px] flex items-center gap-1.5 ${
                            active
                              ? 'bg-forest text-ivory border-forest'
                              : 'border-mist text-ink hover:border-forest/50'
                          }`}
                        >
                          <Check size={12} className={active ? '' : 'hidden'} />
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </details>
            )
          })}
        </div>

        {totalSelected > 0 && (
          <button
            onClick={() => {
              state.interests.forEach(id => dispatch({ type: 'TOGGLE_INTEREST', id }))
            }}
            className="mt-3 text-xs text-muted hover:text-copper transition-colors cursor-pointer"
          >
            {m.clear}
          </button>
        )}
      </div>

      {/* Destinations */}
      <div>
        <p className="text-sm font-semibold text-ink mb-3">
          {f.destinations} <span className="text-muted font-normal">({f.optional})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {t.destinations.items.map(dest => {
            const active = state.destinations.includes(dest.id)
            return (
              <button
                key={dest.id}
                onClick={() => dispatch({ type: 'TOGGLE_DESTINATION', id: dest.id })}
                aria-pressed={active}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer min-h-[44px] ${
                  active
                    ? 'bg-forest text-ivory border-forest'
                    : 'border-mist text-ink hover:border-forest/50'
                }`}
              >
                {dest.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Accommodation */}
      <div>
        <p className="text-sm font-semibold text-ink mb-3">
          {f.accommodation} <span className="text-muted font-normal">({f.optional})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(f.accommodationOptions).map(([key, label]) => {
            const active = state.accommodation === key
            return (
              <button
                key={key}
                onClick={() => dispatch({ type: 'SET_FIELD', field: 'accommodation', value: active ? '' : key })}
                aria-pressed={active}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer min-h-[44px] ${
                  active
                    ? 'bg-forest text-ivory border-forest'
                    : 'border-mist text-ink hover:border-forest/50'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>



      {/* Story */}
      <div>
        <label htmlFor={`${id}-story`} className="block text-sm font-semibold text-ink mb-2">
          {f.story} <span className="text-muted font-normal">({f.optional})</span>
        </label>
        <textarea
          id={`${id}-story`}
          value={state.story}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'story', value: e.target.value })}
          placeholder={f.storyPlaceholder}
          rows={4}
          maxLength={1000}
          className="w-full rounded-xl border border-mist bg-paper px-4 py-3 text-ink placeholder:text-muted/50 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition resize-none"
        />
      </div>
    </div>
  )
}

// ── Step 3: Contact ──────────────────────────────────────────────

interface Step3Props {
  errors: Record<string, string>
}

export function Step3({ errors }: Step3Props) {
  const { t, state, dispatch } = useApp()
  const f = t.form
  const id = useId()

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch({ type: 'SET_FIELD', field: field as any, value: e.target.value })

  const hasError = (field: string) => !!errors[field]

  return (
    <div className="space-y-6">
      {/* Name */}
      <FieldWrapper
        id={`${id}-name`}
        label={f.name}
        required
        error={errors['name']}
      >
        <input
          id={`${id}-name`}
          type="text"
          value={state.name}
          onChange={set('name')}
          autoComplete="name"
          maxLength={100}
          aria-required="true"
          aria-invalid={hasError('name')}
          aria-describedby={hasError('name') ? `${id}-name-err` : undefined}
          className={inputClass(hasError('name'))}
        />
        {errors['name'] && <FieldError id={`${id}-name-err`} message={errors['name']} />}
      </FieldWrapper>

      {/* Email */}
      <FieldWrapper
        id={`${id}-email`}
        label={f.email}
        required
        error={errors['email']}
      >
        <input
          id={`${id}-email`}
          type="email"
          value={state.email}
          onChange={set('email')}
          autoComplete="email"
          maxLength={200}
          aria-required="true"
          aria-invalid={hasError('email')}
          aria-describedby={hasError('email') ? `${id}-email-err` : undefined}
          className={inputClass(hasError('email'))}
        />
        {errors['email'] && <FieldError id={`${id}-email-err`} message={errors['email']} />}
      </FieldWrapper>

      {/* Phone */}
      <FieldWrapper
        id={`${id}-phone`}
        label={`${f.phone} (${f.optional})`}
      >
        <input
          id={`${id}-phone`}
          type="tel"
          value={state.phone}
          onChange={set('phone')}
          autoComplete="tel"
          maxLength={30}
          className={inputClass(false)}
        />
      </FieldWrapper>

      {/* Consent */}
      <div>
        <label className={`flex items-start gap-3 cursor-pointer ${hasError('consent') ? 'text-error' : 'text-ink'}`}>
          <input
            type="checkbox"
            checked={state.consent}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'consent', value: e.target.checked })}
            aria-required="true"
            aria-invalid={hasError('consent')}
            aria-describedby={hasError('consent') ? `${id}-consent-err` : undefined}
            className="mt-1 rounded border-mist text-forest cursor-pointer shrink-0"
          />
          <span className="text-sm leading-relaxed">
            {f.consent}{' '}
            <a href="/privacy" className="underline text-copper hover:text-ink">{f.privacyLink}</a>
          </span>
        </label>
        {errors['consent'] && <FieldError id={`${id}-consent-err`} message={errors['consent']} />}
      </div>

      {/* Summary */}
      <TripSummary />
    </div>
  )
}

function TripSummary() {
  const { t, state } = useApp()
  const f = t.form

  const lines: string[] = []
  if (state.dates) lines.push(state.dates + (state.flexible ? ` (${f.flexible})` : ''))
  if (state.departure) lines.push(state.departure)
  if (state.days && state.days !== 'custom') lines.push(state.days + ' days')
  if (state.days === 'custom' && state.customDays) lines.push(state.customDays)
  if (state.travellers && state.travellers !== 'other') lines.push(state.travellers + ' travellers')
  if (state.travellers === 'other' && state.customTravellers) lines.push(state.customTravellers + ' travellers')
  if (state.journeyId) lines.push(t.journeys.items.find(j => j.id === state.journeyId)?.name || '')
  if (state.houseboat) lines.push(t.houseboat.cta)
  if (state.motorcycle) lines.push(t.motorcycle.cta)
  if (state.interestGroups.length > 0) {
    lines.push(
      state.interestGroups.map(id => t.experiences.cards.find(c => c.id === id)?.title || id).join(', ')
    )
  }
  if (state.destinations.length > 0) {
    lines.push(
      state.destinations.map(id => t.destinations.items.find(d => d.id === id)?.name || id).join(', ')
    )
  }

  if (lines.filter(Boolean).length === 0) return null

  return (
    <div className="rounded-2xl bg-mist p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">{f.summary}</p>
      <ul className="space-y-1.5">
        {lines.filter(Boolean).map((line, i) => (
          <li key={i} className="text-sm text-ink">{line}</li>
        ))}
      </ul>
    </div>
  )
}

function FieldWrapper({ id, label, required, error, children }: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-semibold mb-2 ${error ? 'text-error' : 'text-ink'}`}>
        {label}{required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 mt-1.5 text-xs text-error">
      <AlertCircle size={13} />
      {message}
    </p>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-paper px-4 py-3 text-ink placeholder:text-muted/50 focus:ring-2 outline-none transition min-h-[48px] ${
    hasError
      ? 'border-error focus:border-error focus:ring-error/20'
      : 'border-mist focus:border-forest focus:ring-forest/20'
  }`
}
