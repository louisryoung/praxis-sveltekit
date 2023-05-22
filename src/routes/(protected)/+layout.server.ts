import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import UserSchema from '$lib/db/schemas/UserSchema';
import TradingAccountSchema from '$lib/db/schemas/TradingAccountSchema';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (!locals.user?.isAuthenticated) {
    const { pathname, search } = url;
    throw redirect(303, `/login?next=${encodeURIComponent(pathname + search)}`);
  }

  const user = await UserSchema.findOne({
    id: locals.user?.id,
  });

  const tradingAccounts = await TradingAccountSchema.find({
    userID: locals.user?.id
  })

  return {
    user: {
      email: locals.user.email,
      fullName: locals.user.fullName,
      photo: user?.photo
    },
    tradingAccounts: tradingAccounts?.map((account)=> ({
      id: account.id,
      name: account.name
    }))
  };
};
