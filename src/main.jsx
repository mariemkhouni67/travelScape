import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('🔴 App crashed:', error, info.componentStack)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: 'monospace', padding: 32, background: '#fff0f0', minHeight: '100vh' }}>
          <h1 style={{ color: '#c00', fontSize: 24 }}>❌ Runtime Error</h1>
          <p style={{ fontWeight: 'bold', color: '#900', fontSize: 16, marginTop: 12 }}>
            {this.state.error?.message}
          </p>
          <pre style={{ background: '#fee', padding: 16, borderRadius: 8, marginTop: 16, whiteSpace: 'pre-wrap', fontSize: 13, color: '#600' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {/* reducedMotion="user" makes all motion.* components respect the OS
          "Reduce Motion" accessibility preference automatically. */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
)
