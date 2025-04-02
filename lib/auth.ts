'use server'
import { supabase } from '@/lib/supabase'

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}
