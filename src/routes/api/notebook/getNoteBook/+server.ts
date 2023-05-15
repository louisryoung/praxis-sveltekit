import { json } from '@sveltejs/kit';
import moment from 'moment';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import NotebookSchema from '$lib/db/schemas/NotebookSchema';
import type { Trade } from '$lib/types';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals?.user?.isAuthenticated) {
    return json(
      { success: false, error: 'User not authenticated' },
      { status: 401 }
    );
  }
  const { type, date } = await request.json();

  if (!type || !date) {
    return json(
      { success: false, error: 'Missing Type or Date' },
      { status: 400 }
    );
  }

  const notebook = await getNotebook(locals?.user?.id ?? '', type, date);

  return json({ success: true, notebook });
};

const getNotebook = async (
  userId: string,
  type: 'DAY' | 'WEEK' | 'MONTH',
  date: string
) => {
  const trades = await getUserTrades(userId, ['-1']);
  console.log(date);
  let inNotebook = trades.filter((trade) => {
    if (type == 'DAY') {
      return trade.log_day == date;
    } else if (type == 'WEEK') {
      return trade.log_week == date;
    } else if (type == 'MONTH') {
      return trade.log_month == date;
    }
  });
  // remove duplicates
  inNotebook = inNotebook.filter(
    (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
  );

  const momentDate = moment(trades[0].closeDate);

  const getNotebooker = await NotebookSchema.findOne({
    userId: userId,
    type: type,
    date: date,
  });
  if (!getNotebooker) {
    await NotebookSchema.create({
      userId: userId,
      type: type,
      date: date,
    });
  }

  return {
    date: date,
    trades: inNotebook,
    type: type,
    prettyDate: getNoteBookPretty(type, momentDate, date),
    netPL:
      inNotebook.length > 0
        ? inNotebook.map((trade) => trade.netPL).reduce((a, b) => a + b)
        : 0,
    winRate:
      inNotebook.length > 0
        ? inNotebook.filter((trade) => trade.netPL > 0).length /
          inNotebook.length
        : 0,
    wins:
      inNotebook.length > 0
        ? inNotebook.filter((trade) => trade.netPL > 0).length
        : 0,
    losses:
      inNotebook.length > 0
        ? inNotebook.filter((trade) => trade.netPL < 0).length
        : 0,
    rating: getNotebooker ? getNotebooker.rating : 0,
    feelings: getNotebooker ? getNotebooker.feelings : [],
    notes: {
      howdidifeel:
        getNotebooker && getNotebooker.notes
          ? getNotebooker.notes.howdidifeel
          : '',
      whatwentwell:
        getNotebooker && getNotebooker.notes
          ? getNotebooker.notes.whatwentwell
          : '',
      whatcouldbeimproved:
        getNotebooker && getNotebooker.notes
          ? getNotebooker.notes.whatcouldbeimproved
          : '',
      continue:
        getNotebooker && getNotebooker.notes
          ? getNotebooker.notes.continue
          : '',
      improve:
        getNotebooker && getNotebooker.notes ? getNotebooker.notes.improve : '',
      start:
        getNotebooker && getNotebooker.notes ? getNotebooker.notes.start : '',
      stop:
        getNotebooker && getNotebooker.notes ? getNotebooker.notes.stop : '',
    },
  };
};

const getNoteBookPretty = (
  type: 'DAY' | 'WEEK' | 'MONTH',
  momentDate: moment.Moment,
  date: string
) => {
  if (type == 'DAY') {
    return momentDate.format('dddd, MMMM Do YYYY');
  } else if (type == 'WEEK') {
    return (
      momentDate.startOf('week').format('MMMM Do') +
      ' - ' +
      momentDate.endOf('week').format('MMMM Do YYYY')
    );
  } else if (type == 'MONTH') {
    return momentDate.format('MMMM YYYY');
  }
  return momentDate.format('MMMM YYYY');
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
