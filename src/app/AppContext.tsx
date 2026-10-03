import { createContext, useContext, useReducer, useEffect, useCallback, useState, type ReactNode } from 'react'
import enContent from '../content/en.json'
import deContent from '../content/de.json'
import {
  initialJourneyState,
  journeyReducer,
  type JourneyState,
  type JourneyAction,
  type Locale,
} from '../state/journey'

type Content = typeof enContent

interface AppContextValue {
  state: JourneyState
  dispatch: React.Dispatch<JourneyAction>
  t: Content
  locale: Locale
  setLocale: (locale: Locale) => void
  draftRestored: boolean
  dismissDraftBanner: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const DRAFT_KEY = 'btb_draft'
const LOCALE_KEY = 'btb_locale'

const DRAFT_FIELDS: (keyof JourneyState)[] = [
  'dates', 'flexible', 'departure', 'travellers', 'customTravellers',
  'days', 'customDays', 'party', 'interestGroups', 'interests',
  'destinations', 'accommodation', 'budget', 'houseboat', 'motorcycle', 'journeyId',
]

const contentMap: Record<Locale, Content> = {
  en: enContent as Content,
  de: deContent as Content,
}

const getInitialLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (stored === 'en' || stored === 'de') return stored
    const lang = navigator.language.toLowerCase()
    if (lang.startsWith('de')) return 'de'
  } catch {}
  return 'de'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [draftRestored, setDraftRestored] = useState(false)

  const [state, dispatch] = useReducer(journeyReducer, {
    ...initialJourneyState,
    locale: getInitialLocale(),
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as Partial<JourneyState>
        const safeFields = Object.fromEntries(
          DRAFT_FIELDS.map(f => [f, draft[f as keyof JourneyState]]).filter(([, v]) => v !== undefined)
        )
        if (Object.keys(safeFields).length > 0) {
          dispatch({ type: 'RESTORE_DRAFT', draft: safeFields })
          setDraftRestored(true)
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const draft = Object.fromEntries(DRAFT_FIELDS.map(f => [f, state[f as keyof JourneyState]]))
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {}
  }, [state.dates, state.flexible, state.departure, state.travellers, state.customTravellers,
      state.days, state.customDays, state.party, state.interestGroups, state.interests,
      state.destinations, state.accommodation, state.budget, state.houseboat,
      state.motorcycle, state.journeyId])

  useEffect(() => {
    try { localStorage.setItem(LOCALE_KEY, state.locale) } catch {}
    document.documentElement.lang = state.locale
    document.title = contentMap[state.locale].meta.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', contentMap[state.locale].meta.description)
  }, [state.locale])

  const setLocale = useCallback((locale: Locale) => {
    dispatch({ type: 'SET_LOCALE', locale })
  }, [])

  const dismissDraftBanner = useCallback(() => setDraftRestored(false), [])

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      t: contentMap[state.locale],
      locale: state.locale,
      setLocale,
      draftRestored,
      dismissDraftBanner,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
