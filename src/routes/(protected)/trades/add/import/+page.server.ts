import { fail, redirect } from '@sveltejs/kit';
import { parseNestedOnjects } from '$lib/utils/other';
import type { Actions, PageServerLoad } from './$types';
import UserSchema from '$lib/db/schemas/UserSchema';
import TradingAcctSchema from '$lib/db/schemas/TradingAccountSchema';

export const load = (async ({ locals }) => {
  const user_id = locals.user?.id || '';
  const tradeAccounts = await getUserTradeAccounts(user_id);
  return {
    tradeAccounts,
  };
}) satisfies PageServerLoad;

const getUserTradeAccounts = async (userId: string) => {
  const user = await UserSchema.findOne({
    id: userId,
  });
  if (!user) {
    return undefined;
  }
  const accts = await TradingAcctSchema.find({ userID: user.id });
  if (!accts) {
    return undefined;
  }
  return accts.map((acct) => ({
    id: acct.id,
    name: acct.name,
  }));
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = parseNestedOnjects(Object.fromEntries(formData?.entries()));
    if (!data) {
      return fail(400, {
        error: 'Invalid data',
      });
    }
    return {};

    // return fail(400, { error: '' });
  },
};
