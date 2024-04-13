import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'

import { CLERK_SECRET_KEY } from '$env/static/private'

// Now you can use CLERK_SECRET_KEY as needed in your code.

if (!CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY is not defined in the environment');
}

export const handle: Handle = sequence(
  handleClerk(CLERK_SECRET_KEY, {
    debug: true,
    protectedPaths: ['/addThing', '/fun'],
    signInUrl: '/signin',
  })
)
