import { json } from '@sveltejs/kit';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import TradingAcctSchema from '$lib/db/schemas/TradingAccountSchema';
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
  const { tradeAcctIDs, trades } = await request.json();

  console.log({ tradeAcctIDs, locals });

  const success = await addTradesToUser(
    locals?.user?.id ?? '',
    tradeAcctIDs,
    trades
  );

  if (!success) {
    return json({ success: false, error: 'User not found' }, { status: 400 });
  }
  return json({ success: true });
};

const addTradesToUser = async (
  userId: string,
  tradingAcctIds: string[],
  trades: Trade[]
) => {
  const user = await UserSchema.findOne({ id: userId });
  if (!user) {
    return false;
  }
  for (const trade of trades) {
    for (const tradingAcctId of tradingAcctIds) {
      const alreadyThere = await TradeSchema.findOne({
        symbol: trade.symbol,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        openDate: trade.openDate,
        closeDate: trade.closeDate,
        tradeAcctID: tradingAcctId,
        userID: userId,
      });

      if (alreadyThere) {
        continue;
      }
      if (tradingAcctIds.length == 1 && tradingAcctIds[0] == '-1') {
        const tradingAccts = await TradingAcctSchema.find({ userID: userId });
        for (const tradingAcct of tradingAccts) {
          console.log({
            ...trade,
            userID: user.id,
            tradeAcctID: tradingAcct.id,
          });
          await TradeSchema.create({
            ...trade,
            userID: user.id,
            tradeAcctID: tradingAcct.id,
          });
        }
      } else {
        await TradeSchema.create({
          ...trade,
          userID: user.id,
          tradeAcctID: tradingAcctId,
        });
        console.log({
          ...trade,
          userID: user.id,
          tradeAcctID: tradingAcctId,
        });
      }
    }
  }
  return true;
};
