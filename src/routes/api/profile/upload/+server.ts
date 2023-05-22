import { json } from '@sveltejs/kit';
import UserSchema from '$lib/db/schemas/UserSchema';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const { photo } = await request.json();

  try {
    await UserSchema.updateOne(
      {
        id: locals?.user?.id,
      },
      {
        $set: {
          photo,
        },
      }
    );
    return json({ success: true });
  } catch (e) {
    return json({ success: false, error: e }, { status: 400 });
  }
};
