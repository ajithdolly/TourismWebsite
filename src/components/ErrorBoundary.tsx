import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Render crash:', error.message)
    console.error(error.stack)
    console.error(info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#F6F4EC', zIndex: 9999, padding: '2rem',
        }}>
          <div style={{ maxWidth: 560, fontFamily: 'monospace' }}>
            <h1 style={{ color: '#A85031', marginBottom: '1rem' }}>Render error</h1>
            <pre style={{
              background: '#fff', border: '1px solid #E3E8DF', borderRadius: 8,
              padding: '1rem', fontSize: 13, whiteSpace: 'pre-wrap', overflowY: 'auto', maxHeight: 300,
            }}>
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              style={{
                marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#12372E',
                color: '#F6F4EC', border: 'none', borderRadius: 999, cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
