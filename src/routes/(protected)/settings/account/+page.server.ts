import UserSchema from '$lib/db/schemas/UserSchema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const user_id = locals.user?.id || '';
  const user = await UserSchema.findOne({
    id: user_id,
  });
  if (user) {
    return {
      email: user?.email,
      fullName: user?.fullName,
      id: user?.id,
      createdAt: user?.createdAt,
    };
  }
  return {};
};
