import { json } from '@sveltejs/kit';
import UserSchema from '$lib/db/schemas/UserSchema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const user_id = locals.user?.id || '';
  const user = await UserSchema.findOne({
    id: user_id,
  });
  if (user) {
    return json({
      success: true,
      userInfo: {
        email: user?.email,
        fullName: user?.fullName,
        id: user?.id,
        createdAt: user?.createdAt,
      },
    });
  }
  return json({ success: false }, { status: 404 });
};
