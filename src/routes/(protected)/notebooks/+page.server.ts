// import trades from './data';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import NotebookSchema from '$lib/db/schemas/NotebookSchema';
import { parseMongoDBObject, parseTrade } from '$lib/server/utils/mongodb';
import type { PageServerLoad } from './$types';
import type { Notebook, Trade } from '$lib/types';

type TradesByDay = {
  id: string;
  date: string;
  trades: Trade[];
  netPL: number;
  wins: number;
  losses: number;
  winRate: number;
};

export const load = (async ({ url, locals }) => {
  const tradesByDay = new Promise<
    {
      id: string;
      items: TradesByDay[];
    }[]
  >(async (resolve, reject) => {
    const data = await TradeSchema.aggregate([
      {
        $match: {
          userID: locals?.user?.id ?? '',
        },
      },
      {
        $sort: {
          openDate: 1,
        },
      },
      {
        $group: {
          _id: {
            month: {
              $dateToString: {
                // iso format
                format: '%Y-%m-01T00:00:00.%LZ',
                date: '$closeDate',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            },
            day: {
              $dateToString: {
                format: '%Y-%m-%dT00:00:00.%LZ',
                date: '$closeDate',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            },
          },
          trades: {
            $push: '$$ROOT',
          },
          netPL: {
            $sum: '$netPL',
          },
          wins: {
            $sum: {
              $cond: [{ $gt: ['$netPL', 0] }, 1, 0],
            },
          },
          losses: {
            $sum: {
              $cond: [{ $lt: ['$netPL', 0] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: {
          '_id.day': 1,
        },
      },
      {
        $group: {
          _id: '$_id.month',
          items: {
            $push: {
              date: '$_id.day',
              trades: '$trades',
              netPL: '$netPL',
              wins: '$wins',
              losses: '$losses',
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]).then((res) => {
      return res.map(({ _id, items }) => {
        return {
          id: _id,
          winRate:
            items.reduce(
              (acc, { wins, losses }) => acc + wins / (wins + losses),
              0
            ) / items.length,
          items: items.map(({ date, trades, netPL, wins, losses }) => ({
            id: date,
            date: date,
            trades: trades.map(parseMongoDBObject).map(parseTrade),
            netPL: netPL,
            wins: wins,
            losses: losses,
            winRate: wins / (wins + losses),
          })),
        };
      });
    });
    resolve(data);
  });

  const notebooks = new Promise<Notebook[]>(async (resolve, reject) => {
    const data = await NotebookSchema.find({
      userID: locals?.user?.id ?? '',
    }).then((data) => data.map(parseMongoDBObject));
    resolve(data);
  });

  return {
    groupedTradesByDay: tradesByDay,
    notebooks: notebooks,
  };
}) satisfies PageServerLoad;
