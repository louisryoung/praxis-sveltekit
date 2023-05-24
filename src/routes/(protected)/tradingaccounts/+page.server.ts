import TradingAccountSchema from '$lib/db/schemas/TradingAccountSchema';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const tradingAccounts = async () => {
    const data = await TradingAccountSchema.find({
      userID: locals?.user?.id ?? '',
    });

    return data.map((tradingAccount) => ({
      id: tradingAccount.id,
      name: tradingAccount.name,
      userID: tradingAccount.userID,
      broker: tradingAccount.broker,
      createdAt: tradingAccount.createdAt,
    }));
  };

  return {
    tradingAccounts: tradingAccounts(),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  add_trading_account: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData());
    try {
      await TradingAccountSchema.create({
        name: data.name,
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        userID: locals?.user?.id,
        broker: data.broker,
      });

      return { success: true };
    } catch (e) {
      return fail(400, { errors: e?.message });
    }
  },
};
