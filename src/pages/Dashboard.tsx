import { useAuth } from '../hooks/useAuth'

export function Dashboard() {
  const { user } = useAuth()

  // FIXED: Safely access user metadata
  const userName = user?.user_metadata?.full_name || 'Doctor'

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {userName}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ASCO 2024 Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">ASCO 2024</h2>
          <p className="text-gray-600 mb-4">Chicago, IL | June 3-7, 2024</p>
          <p className="text-sm text-gray-500 mb-4">9,000+ sessions</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            View Schedule
          </button>
        </div>

        {/* ESMO 2024 Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">ESMO 2024</h2>
          <p className="text-gray-600 mb-4">Barcelona, Spain | Oct 12-16</p>
          <p className="text-sm text-gray-500 mb-4">24,000+ sessions</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            View Schedule
          </button>
        </div>

        {/* Add More Conferences */}
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300">
          <h2 className="text-xl font-bold mb-2 text-gray-500">Add Conference</h2>
          <p className="text-gray-400 mb-4">Upload your own schedule</p>
          <button className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
            Upload Data
          </button>
        </div>
      </div>
    </div>
  )
}