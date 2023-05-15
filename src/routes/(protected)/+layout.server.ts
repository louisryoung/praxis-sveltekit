import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user?.isAuthenticated) {
    const { pathname, search } = url;
    throw redirect(303, `/login?next=${encodeURIComponent(pathname + search)}`);
  }
  return {
    user: {
      email: locals.user.email,
      fullName: locals.user.fullName,
    },
  };
};
