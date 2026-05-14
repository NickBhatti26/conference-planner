import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/common/Navigation'
import { SignupForm } from './components/auth/SignupForm'
import { LoginForm } from './components/auth/LoginForm'
import { Dashboard } from './pages/Dashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App