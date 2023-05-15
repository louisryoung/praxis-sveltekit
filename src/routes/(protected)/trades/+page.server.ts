// import trades from './data';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import { parseMongoDBObject } from '$lib/server/utils/mongodb';
import { getTradePageData } from '$lib/utils/trade';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
  const offset = url.searchParams.has('offset')
    ? parseInt(url.searchParams.get('offset') as string)
    : 0;
  const limit = url.searchParams.has('limit')
    ? parseInt(url.searchParams.get('limit') as string)
    : 10;
  const trades = async () => {
    const data = await TradeSchema.aggregate([
      {
        $match: {
          userID: locals?.user?.id ?? '',
        },
      },
      {
        $sort: {
          openDate: -1,
        },
      },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'tradeinputs',
          localField: 'id',
          foreignField: 'tradeID',
          as: 'inputs',
        },
      }
    ]);
    return data.map(parseMongoDBObject).map((trade) => ({
      ...trade,
      inputs: trade.inputs[0],
    }));
  };
  const tradeData = await (async () => {
    const data = await TradeSchema.find({
      userID: locals?.user?.id ?? '',
    });
    return { ...getTradePageData(data), total: data.length };
  })();
  return {
    trades: trades(),
    tradeData,
    pagination: {
      offset,
      limit,
      total: tradeData.total,
      start: offset + 1,
      end: Math.min(offset + limit, tradeData.total),
      previous: {
        index: Math.floor(offset - limit / limit),
        offset: Math.max(0, offset - limit),
        limit,
        disabled: offset === 0,
      },
      next: {
        index: Math.floor(offset + limit / limit),
        offset: offset + (offset + limit < tradeData.total ? limit : 0),
        limit,
        disabled: offset + limit >= tradeData.total,
      },
      current: {
        index: Math.floor(offset / limit),
        offset,
        limit,
      },
    },
  };
}) satisfies PageServerLoad;
