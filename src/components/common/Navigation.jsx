import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Navigation() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Conference Planner
        </Link>

        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/conferences" className="text-gray-700 hover:text-blue-600">
                Conferences
              </Link>
              <Link to="/my-schedule" className="text-gray-700 hover:text-blue-600">
                My Schedule
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-blue-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Log In
              </Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}