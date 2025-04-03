import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Define protected routes
const PROTECTED_ROUTES = ['/profile']

// Define explicitly public routes
const PUBLIC_ROUTES = [
  '/',
  '/unauthorised',
  '/api',
  // Add more public routes here
]

// Define static resources that should always be accessible
const STATIC_RESOURCES = [
  '/_next/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/images/',
  '/fonts/',
]

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get current path
  const path = request.nextUrl.pathname

  // Check if the current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(route + '/')
  )

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(route + '/')
  )

  // Check if it's a static resource
  const isStaticResource = STATIC_RESOURCES.some((resource) =>
    path.startsWith(resource)
  )

  // Only redirect if:
  // 1. User is not logged in AND
  // 2. They're trying to access a protected route AND
  // 3. It's not a static resource or public route
  if (!user && isProtectedRoute && !isStaticResource && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/unauthorised'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as is.
  return supabaseResponse
}
