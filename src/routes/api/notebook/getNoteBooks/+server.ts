import { json } from '@sveltejs/kit';
import moment from 'moment';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import type { Notebook, Trade } from '$lib/types';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const { type, tradeAcctIDs } = await request.json();

  if (!type || !tradeAcctIDs) {
    return json(
      { success: false, error: 'Missing Type or Date' },
      { status: 400 }
    );
  }
  let notebooks: (Partial<Notebook> & Record<string, any>)[] = [];

  const user_id = locals.user?.id || '';

  if (type == 'DAY') {
    notebooks = await getNotebookDays(user_id, tradeAcctIDs);
  }
  if (type == 'WEEK') {
    notebooks = await getNotebookWeeks(user_id, tradeAcctIDs);
  }
  if (type == 'MONTH') {
    notebooks = await getNotebookMonths(user_id, tradeAcctIDs);
  }

  return json({ success: true, notebooks });
};

const getNotebookDays = async (userId: string, tradeAcctIds: string[]) => {
  const tradesF = await getUserTrades(userId, tradeAcctIds);
  // get latest trade date
  const latestTradeDate = new Date(
    Math.max.apply(
      null,
      tradesF.map((trade) => {
        return trade.closeDate.getTime();
      })
    )
  );
  const latestDateMoment = moment(latestTradeDate);
  const date = latestDateMoment.add(1, 'day');

  const days = [];
  for (let i = 0; i < 365; i++) {
    const date = latestDateMoment.subtract(1, 'day');
    const search = date.dayOfYear().toString() + '-' + date.year().toString();
    const trades = tradesF.filter((trade) => {
      return trade.log_day == search;
    });
    days.push({
      date: search,
      trades: trades.length > 0 ? trades : [],
      type: 'DAY' as const,
      prettyDate: date.format('MMMM Do YYYY'),
      netPL:
        trades.length > 0
          ? trades.map((trade) => trade.netPL).reduce((a, b) => a + b)
          : 0,
      winRate:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length / trades.length
          : 0,
      wins:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length
          : 0,
      losses:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL < 0).length
          : 0,
    });
  }
  return days;
};

export const getNotebookWeeks = async (
  userId: string,
  tradeAcctIds: string[]
) => {
  const tradesF = await getUserTrades(userId, tradeAcctIds);
  // get latest trade date
  const latestTradeDate = new Date(
    Math.max.apply(
      null,
      tradesF.map((trade) => {
        return trade.closeDate.getTime();
      })
    )
  );
  const latestDateMoment = moment(latestTradeDate);
  const weeks = [];
  const date = latestDateMoment.add(1, 'week');

  for (let i = 0; i < 365; i++) {
    const date = latestDateMoment.subtract(1, 'week');
    const search = date.week().toString() + '-' + date.year().toString();
    const trades = tradesF.filter((trade) => {
      return trade.log_week == search;
    });
    weeks.push({
      date: search,
      trades: trades.length > 0 ? trades : [],
      type: 'WEEK' as const,
      prettyDate:
        date.startOf('week').format('MMMM Do') +
        ' - ' +
        date.endOf('week').format('MMMM Do YYYY'),
      netPL:
        trades.length > 0
          ? trades.map((trade) => trade.netPL).reduce((a, b) => a + b)
          : 0,
      winRate:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length / trades.length
          : 0,
      wins:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length
          : 0,
      losses:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL < 0).length
          : 0,
    });
  }
  return weeks;
};
const getNotebookMonths = async (userId: string, tradeAcctIds: string[]) => {
  const tradesF = await getUserTrades(userId, tradeAcctIds);
  // get latest trade date
  const latestTradeDate = new Date(
    Math.max.apply(
      null,
      tradesF.map((trade) => {
        return trade.closeDate.getTime();
      })
    )
  );
  const latestDateMoment = moment(latestTradeDate);
  const date = latestDateMoment.add(1, 'month');

  const months = [];
  for (let i = 0; i < 365; i++) {
    const date = latestDateMoment.subtract(1, 'month');
    const search = date.month().toString() + '-' + date.year().toString();
    const trades = tradesF.filter((trade) => {
      return trade.log_month == search;
    });
    months.push({
      date: search,
      trades: trades.length > 0 ? trades : [],
      type: 'MONTH' as const,
      prettyDate: date.format('MMMM YYYY'),
      netPL:
        trades.length > 0
          ? trades.map((trade) => trade.netPL).reduce((a, b) => a + b)
          : 0,
      winRate:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length / trades.length
          : 0,
      wins:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL > 0).length
          : 0,
      losses:
        trades.length > 0
          ? trades.filter((trade) => trade.netPL < 0).length
          : 0,
    });
  }
  return months;
};

const getUserTrades = async (
  userId: string,
  tradeAcctIds: string[]
): Promise<Trade[]> => {
  let trades: Trade[] = [];
  console.log(tradeAcctIds);
  if (tradeAcctIds.length == 1 && tradeAcctIds[0] == '-1') {
    trades = trades.concat(await TradeSchema.find({ userID: userId }));
  } else {
    for (const tradeAcctId of tradeAcctIds) {
      const tradesForAcct = await TradeSchema.find({
        userID: userId,
        tradeAcctID: tradeAcctId,
      });
      trades.push(...tradesForAcct);
    }
  }
  // remove duplicates

  const uniqueTrades: Trade[] = [];
  const seen = new Set();
  for (const trade of trades) {
    if (seen.has(trade.id)) continue;
    seen.add(trade.id);
    uniqueTrades.push(trade);
  }
  return uniqueTrades;
};
