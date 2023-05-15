import moment from 'moment';
// import { getTradePageData as getTradePageDataOld } from '$lib/utils/trade';
import type { PageServerLoad } from './$types';
import { parseMongoDBObject, parseTrade } from '$lib/server/utils/mongodb';
import TradeSchema from '$lib/db/schemas/TradeSchema';

export const load = (async ({ url, locals }) => {
  const trades = (
    await TradeSchema.find({
      userID: locals?.user?.id ?? '',
    })
  )
    .map(parseMongoDBObject)
    .map(parseTrade);
  return {
    // trades: trades
    //   .sort((a, b) => b.openDate.getTime() - a.openDate.getTime()),
    tradeData: getTradePageData(trades),
    daily: getDailyTradeData(trades),
  };
}) satisfies PageServerLoad;

const getTradePageData = (trades: any[]) => {
  let largestProfit = 0;
  let largestLoss = 0;
  let maxConsecutiveWins = 0;
  let maxConsecutiveLosses = 0;
  let currentWin = 0;
  let currentLoss = 0;
  let winCount = 0;
  let lossCount = 0;
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
