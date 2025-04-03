import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const Profile = async () => {
  const supabase = await createClient()

  // Get the current user - using getUser() as recommended for security
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user is signed in, redirect to the unauthorised page
  if (!user) {
    redirect('/unauthorised')
  }

  // Fetch the user's profile data from the profiles table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    // TODO: You could redirect to an error page or handle this differently
  }

  const displayName = profile?.display_name || 'Reader'

  return (
    <div className="mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold font-heading italic mb-4">
        Hello, {displayName}!
      </h1>
      <div className="bg-background-200 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p className="mb-4">Welcome to your personal dashboard.</p>

        {/* Add more profile content here */}
        <div className="grid gap-4 mt-6">
          <div className="p-4 bg-background-100 rounded border border-primary-200">
            <h3 className="font-medium text-lg">Account Information</h3>
            <p className="text-text-600">Display Name: {displayName}</p>
            <p className="text-text-600">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
