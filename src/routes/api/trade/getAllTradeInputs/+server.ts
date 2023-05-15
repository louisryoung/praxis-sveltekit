import { json } from '@sveltejs/kit';
import TradeInputSchema from '$lib/db/schemas/TradeInputSchema';
import type { RequestHandler } from './$types';
import type { TradeInput } from '$lib/types';

export const GET: RequestHandler = async ({ locals, request }) => {
  const { tradeAccountIDs } = await request.json();
  const user_id = locals.user?.id || '';
  const trades = await getAllTradeInputs(user_id, tradeAcctIDs);
  if (trades) {
    return json({ success: true, tradeInputs: trades });
  }
  return json(
    { success: false, error: 'Error fetching data' },
    { status: 404 }
  );
};

export const getAllTradeInputs = async (
  userId: string,
  tradeAcctIds: string[]
): Promise<TradeInput[]> => {
  let trades = await TradeInputSchema.find({ userId: userId });
  // remove duplicates
  trades = trades.filter(
    (trade, index, self) =>
      index === self.findIndex((t) => t?._id === trade?._id)
  );
  return trades;
};
