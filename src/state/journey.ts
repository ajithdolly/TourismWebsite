export type Locale = 'en' | 'de'

export interface JourneyState {
  locale: Locale
  // Trip basics
  dates: string
  flexible: boolean
  departure: string
  travellers: string
  customTravellers: string
  days: string
  customDays: string
  party: string
  // Interests
  interestGroups: string[]    // broad card IDs e.g. 'nature', 'food'
  interests: string[]         // detailed activity IDs e.g. 'tea-plantations'
  destinations: string[]
  accommodation: string
  budget: string
  story: string
  // Features
  houseboat: boolean
  motorcycle: boolean
  // Journey idea
  journeyId: string
  // Contact
  name: string
  email: string
  phone: string
  consent: boolean
  // UI
  step: number
  summaryOpen: boolean
}

export type JourneyAction =
  | { type: 'SET_LOCALE'; locale: Locale }
  | { type: 'SET_FIELD'; field: keyof JourneyState; value: string | boolean | number }
  | { type: 'TOGGLE_INTEREST_GROUP'; id: string }
  | { type: 'TOGGLE_INTEREST'; id: string }
  | { type: 'TOGGLE_DESTINATION'; id: string }
  | { type: 'SET_JOURNEY'; id: string; suggestedDays?: string }
  | { type: 'SET_DURATION'; days: string }
  | { type: 'SET_STEP'; step: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'ADD_FEATURE'; feature: 'houseboat' | 'motorcycle' }
  | { type: 'RESTORE_DRAFT'; draft: Partial<JourneyState> }
  | { type: 'RESET_DRAFT' }
  | { type: 'OPEN_SUMMARY' }
  | { type: 'CLOSE_SUMMARY' }

export const initialJourneyState: JourneyState = {
  locale: 'de',
  dates: '',
  flexible: false,
  departure: '',
  travellers: '',
  customTravellers: '',
  days: '',
  customDays: '',
  party: '',
  interestGroups: [],
  interests: [],
  destinations: [],
  accommodation: '',
  budget: '',
  story: '',
  houseboat: false,
  motorcycle: false,
  journeyId: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
  step: 0,
  summaryOpen: false,
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]
}

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.locale }
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_INTEREST_GROUP':
      return { ...state, interestGroups: toggle(state.interestGroups, action.id) }
    case 'TOGGLE_INTEREST':
      return { ...state, interests: toggle(state.interests, action.id) }
    case 'TOGGLE_DESTINATION':
      return { ...state, destinations: toggle(state.destinations, action.id) }
    case 'SET_JOURNEY': {
      const newState: JourneyState = { ...state, journeyId: action.id }
      if (action.suggestedDays && !state.days) {
        newState.days = action.suggestedDays
      }
      return newState
    }
    case 'SET_DURATION':
      return { ...state, days: action.days }
    case 'SET_STEP':
      return { ...state, step: action.step }
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 2) }
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) }
    case 'ADD_FEATURE':
      return { ...state, [action.feature]: true }
    case 'RESTORE_DRAFT':
      return { ...state, ...action.draft }
    case 'RESET_DRAFT':
      return {
        ...initialJourneyState,
        locale: state.locale,
        step: state.step,
        name: '',
        email: '',
        phone: '',
        consent: false,
      }
    case 'OPEN_SUMMARY':
      return { ...state, summaryOpen: true }
    case 'CLOSE_SUMMARY':
      return { ...state, summaryOpen: false }
    default:
      return state
  }
}
