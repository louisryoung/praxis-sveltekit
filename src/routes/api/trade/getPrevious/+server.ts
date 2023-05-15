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
  const previousTrade = await TradeSchema.find({
    userID: user_id,
    closeDate: { $gt: trade.closeDate.getTime() },
  })
    .sort({ closeDate: -1 })
    .limit(1);
  if (!previousTrade) {
    return json(
      { success: false, error: 'Error fetching data' },
      { status: 404 }
    );
  }
  if (previousTrade.length == 0) {
    return json({ success: true, tradeID: undefined });
  }
  return json({
    success: true,
    tradeID: previousTrade ? previousTrade[0].id : null,
  });
};
