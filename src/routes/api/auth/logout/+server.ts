import { MODE } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  // cookies.delete('access_token');
  // cookies.delete('refresh_token');
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
  return new Response(undefined);
};
