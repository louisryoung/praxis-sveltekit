import UserSchema from '$lib/db/schemas/UserSchema';
import type { PageServerLoad } from './$types';
import { fail, json } from '@sveltejs/kit';
import { updateProfile } from '$lib/server/auth';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const user_id = locals.user?.id || '';
  const user = await UserSchema.findOne({
    id: user_id,
  });
  if (user) {
    return {
      email: user?.email,
      username: user?.username,
      language: user?.language,
      photo: user?.photo,
      fullName: user?.fullName,
      id: user?.id,
      createdAt: user?.createdAt,
    };
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const payload: Record<string, string> = {
      fullName: data.first_name + ' ' + data.last_name,
      username: data.username as string,
      language: data.language as string,
    };

    if (!locals?.user?.isAuthenticated) {
      return json(
        { success: false, error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const user = await updateProfile({
      id: locals.user?.id,
      ...payload,
    }).catch((err) => {
      return null;
    });

    if (user && user.id) {
      return { success: true };
    }

    return fail(400, { error: 'Failed to update profile' });
  },
};
