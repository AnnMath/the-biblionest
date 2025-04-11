import ProfileCard from '@/components/profile/profile-card'
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
  const email = user.email

  return (
    <div className="bg-background-300 min-h-screen w-full py-8">
      <ProfileCard displayName={displayName} email={email} />
    </div>
  )
}

export default Profile
