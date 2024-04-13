import type { HandleClientError } from '@sveltejs/kit'
// To use Clerk components:
import { initializeClerkClient } from 'clerk-sveltekit/client'
// Or for headless mode:
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'


if (!PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error('PUBLIC_CLERK_PUBLISHABLE_KEY is not defined in the environment');
  }
  

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/admin/',
	afterSignUpUrl: '/admin/',
	signInUrl: '/signin',
	signUpUrl: '/sign-up',
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}