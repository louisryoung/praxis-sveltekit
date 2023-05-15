import { fail } from '@sveltejs/kit';
import { register } from '$lib/server/auth';
import type { Actions } from './$types';

const parseNestedOnjects = (obj: any) => {
  for (const key of Object.keys(obj)) {
    if (key.indexOf('__') !== -1) {
      const parent = key.split('__')[0];
      const child = key.split('__').slice(1).join('__');
      obj[parent] = parseNestedOnjects({ ...obj[parent], [child]: obj[key] });
      delete obj[key];
    }
  }
  return obj;
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    let data = Object.fromEntries(formData.entries());
    if (
      data.password &&
      data.password_again &&
      data.password !== data.password_again
    ) {
      return fail(400, {
        password_again: 'Passwords do not match',
      });
    }

    data = parseNestedOnjects(data);

    // data.username = data.profile?.first_name + ' ' + data.profile?.last_name;
    const profile = data.profile as Record<string, any>;
    data.fullName = profile?.first_name + ' ' + profile?.last_name;
    const user = await register({
      ...data,
      password: data.password as string,
    }).catch((err) => {
      return null;
    });
    if (user && user.id) {
      return { success: true };
    }

    return fail(400, { error: 'Failed to register user' });
  },
};
