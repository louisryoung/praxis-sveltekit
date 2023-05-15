import { json } from '@sveltejs/kit';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, request }) => {
  const { id: tradeId } = await request.json();
  const user_id = locals.user?.id || '';
  const trade = await TradeSchema.findOne({ id: tradeId, userID: user_id });
  if (!trade) {
    return json({ success: false, error: 'Invalid trade ID' }, { status: 400 });
  }
  const nextTrade = await TradeSchema.find({
    userID: user_id,
    closeDate: { $gt: trade.closeDate.getTime() },
  })
    .sort({ closeDate: 1 })
    .limit(1);
  if (!nextTrade) {
    return json(
      { success: false, error: 'Error fetching data' },
      { status: 404 }
    );
  }
  if (nextTrade.length == 0) {
    return json({ success: true, tradeID: undefined });
  }
  return json({ success: true, tradeID: nextTrade ? nextTrade[0].id : null });
};
