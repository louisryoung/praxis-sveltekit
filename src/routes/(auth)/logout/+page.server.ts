import { MODE } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const response = await fetch(url.pathname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.set('access_token', '', {
      path: '/',
      httpOnly: true,
      secure: MODE === 'production',
      sameSite: 'strict',
      maxAge: 1, // smallest positive value for compatibility
    });
    cookies.set('refresh_token', '', {
      path: '/',
      httpOnly: true,
      secure: MODE === 'production',
      sameSite: 'strict',
      maxAge: 1, // smallest positive value for compatibility
    });
    return { success: true };
  },
};
