import { fail, redirect } from '@sveltejs/kit';
import { MODE } from '$env/static/private';
import { authenticate } from '$lib/server/auth';
import { parseJwtPayload } from '$lib/server/utils/token';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.isAuthenticated) {
    throw redirect(303, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const domain = new URL(request.url).hostname;
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData?.entries());
    const data = await authenticate({
      username: credentials.username.toString(),
      email: credentials.username.toString(),
      password: credentials.password.toString(),
    }).catch((err) => {
      return null;
    });
    if (!data) {
      return fail(401, {
        error: 'Invalid username or password',
      });
    }
    const { access_token, refresh_token, expires_in } = data;
    if (access_token) {
      const payload = parseJwtPayload(refresh_token);
      cookies.set('access_token', access_token, {
        path: '/',
        domain,
        httpOnly: true,
        secure: MODE === 'production',
        sameSite: 'strict',
        maxAge: expires_in,
      });
      cookies.set('refresh_token', refresh_token, {
        path: '/',
        domain,
        httpOnly: true,
        secure: MODE === 'production',
        sameSite: 'strict',
        ...(payload.exp && {
          maxAge: payload.exp - Math.floor(Date.now() / 1000),
        }),
      });
      return { success: true };
    }

    return fail(401, { error: 'Invalid username or password' });
  },
};
