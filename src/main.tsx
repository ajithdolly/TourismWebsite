import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

// Always start at top — disable browser's scroll restoration on refresh/back-nav
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0 })

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
