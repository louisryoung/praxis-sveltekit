import moment from 'moment';
// import { getTradePageData as getTradePageDataOld } from '$lib/utils/trade';
import { parseMongoDBObject, parseTrade } from '$lib/server/utils/mongodb';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import type { Trade } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
  const userID = locals?.user?.id ?? '';
  const trades = new Promise<Trade[]>(async (resolve, reject) => {
    const data = await TradeSchema.find({
      userID: locals?.user?.id ?? '',
    }).then((data) => data.map(parseMongoDBObject).map(parseTrade));
    resolve(data);
  });

  const { startDate, endDate } = await getCaledarDates(url);

  const getCalendarData = async () => {
    const query = await TradeSchema.aggregate([
      {
        $match: {
          userID,
          closeDate: {
            $gte: startDate,
            $lte: endDate,
          },
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
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$closeDate',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          },
          trades: {
            $push: '$$ROOT',
          },
          netPL: {
            $sum: '$netPL',
          },
        },
      },
    ]);
    return query.map(({ trades, _id, netPL }) => {
      return {
        date: _id,
        trades: trades.map(parseMongoDBObject).map(parseTrade),
        netPL: netPL,
      };
    });
  };
  return {
    // trades: trades
    //   .sort((a, b) => b.openDate.getTime() - a.openDate.getTime()),
    tradeData: trades.then((d) => getTradePageData(d)),
    daily: trades.then((d) => getDailyTradeData(d)),
    calendarData: getCalendarData(),
  };
}) satisfies PageServerLoad;

const getCaledarDates = async (url: URL) => {
  let startDate: Date = new Date();
  let endDate: Date = new Date();
  if (
    url.searchParams.has('calendar_month') &&
    url.searchParams.has('calendar_year')
  ) {
    const calendarMonth = parseInt(
      url.searchParams.get('calendar_month') as string,
      10
    );
    const calendarYear = parseInt(
      url.searchParams.get('calendar_year') as string,
      10
    );
    startDate = new Date(
      +new Date(`${calendarYear}-${calendarMonth}-01`) - 6048e5
    );
    endDate = new Date(
      +new Date(
        `${calendarMonth === 12 ? calendarYear + 1 : calendarYear}-${
          calendarMonth === 12 ? 1 : calendarMonth + 1
        }-01`
      ) + 6048e5
    );
  } else {
    startDate = new Date();
    startDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
    startDate = new Date(startDate.getTime() - 6048e5);
    endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 2);
    endDate = new Date(endDate.getTime() + 6048e5);
  }
  return {
    startDate,
    endDate,
  };
};

const getTradePageData = (trades: any[]) => {
  let largestProfit = 0;
  let largestLoss = 0;
  let maxConsecutiveWins = 0;
  let maxConsecutiveLosses = 0;
  let currentWin = 0;
  let currentLoss = 0;
  let winCount = 0;
  let lossCount = 0;
  let winDays = new Set();
  let lossDays = new Set();
  let winTotalNetPL = 0;
  let lossTotalNetPL = 0;
  let totalFees = 0;
  let holdingTimeForWinners = 0;
  let holdingTimeForLosers = 0;
  for (let i = 0; i < trades.length; i++) {
    const trade = trades[i];
    totalFees += trades[i].totalFee;
    if (trade.netPL > 0) {
      winTotalNetPL += trade.netPL;
      currentWin++;
      winCount++;
      holdingTimeForWinners +=
        moment(trade.openDate).valueOf() - moment(trade.closeDate).valueOf();
      winDays.add(moment(trade.closeDate).format('YYYY-MM-DD'));
      if (trade.netPL > largestProfit) largestProfit = trade.netPL;
      if (currentLoss > maxConsecutiveLosses)
        maxConsecutiveLosses = currentLoss;
      currentLoss = 0;
    } else if (trade.netPL < 0) {
      lossTotalNetPL += trade.netPL;
      currentLoss++;
      lossCount++;
      holdingTimeForLosers +=
        moment(trade.openDate).valueOf() - moment(trade.closeDate).valueOf();
      lossDays.add(moment(trade.closeDate).format('YYYY-MM-DD'));
      if (trade.netPL < largestLoss) largestLoss = trade.netPL;
      if (currentWin > maxConsecutiveWins) maxConsecutiveWins = currentWin;
      currentWin = 0;
    } else {
      if (currentLoss > maxConsecutiveLosses)
        maxConsecutiveLosses = currentLoss;
      if (currentWin > maxConsecutiveWins) maxConsecutiveWins = currentWin;
      currentLoss = 0;
      currentWin = 0;
    }
  }
  const totalNetPL = winTotalNetPL + lossTotalNetPL;
  const profitFactor = winTotalNetPL / -lossTotalNetPL;
  return {
    totalNetPL,
    maxConsecutiveWins,
    maxConsecutiveLosses,
    profitFactor,
    largestProfit,
    largestLoss,
    averageWin: winTotalNetPL / winCount,
    averageLoss: lossTotalNetPL / lossCount,
    numberOfLosers: lossCount,
    numberOfWinners: winCount,
    totalFees,
    averageHoldingTimeForWinners: holdingTimeForWinners / winCount,
    averageHoldingTimeForLosers: holdingTimeForLosers / lossCount,
    totalTrades: trades.length,
    winRatio: winCount / trades.length,
    winDays: winDays.size,
    lossDays: lossDays.size,
    winRatioByDay: winDays.size / (winDays.size + lossDays.size),
  };
};

const getDailyTradeData = (trades: any[]) => {
  const dailyPL = trades.reduce((acc, trade) => {
    const date = trade.closeDate;
    const momentedDate = moment(date).format('YYYY-MM-DD');
    if (acc[momentedDate]) {
      acc[momentedDate] += trade.netPL;
    } else {
      acc[momentedDate] = trade.netPL;
    }
    return acc;
  }, {} as { [key: string]: number });
  return {
    dailyPL,
  };
};
