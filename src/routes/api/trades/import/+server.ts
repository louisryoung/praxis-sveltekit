import { json } from '@sveltejs/kit';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import TradeInputSchema from '$lib/db/schemas/TradeInputSchema';
import UserSchema from '$lib/db/schemas/UserSchema';
import type { Trade } from '$lib/types';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const { tradeAccountIDs, trades } = await request.json();
  const userID = locals?.user?.id ?? '';

  const success = await addTradesToUser(userID, tradeAccountIDs, trades);

  if (!success) {
    return json({ success: false, error: 'User not found' }, { status: 400 });
  }
  return json({ success: true });
};

const addTradesToUser = async (
  userID: string,
  tradingAccountIds: string[],
  trades: Trade[]
) => {
  const user = await UserSchema.findOne({ id: userID });
  if (!user) {
    return false;
  }
  for (const tradingAcctId of tradingAccountIds) {
    const dbTrades = await TradeSchema.insertMany(
      trades.map((trade) => ({
        ...trade,
        userID,
        tradeAccountID: tradingAcctId,
      }))
    );
    await TradeInputSchema.insertMany(
      dbTrades.map((trade) => ({
        tradeID: trade.id,
        userID: userID,
        feelings: [],
        notes: {
          whyEntered: '',
          managed: '',
          errors: '',
          improvements: '',
        },
        setups: [],
        mistakes: [],
      }))
    );
  }
  return true;
};
