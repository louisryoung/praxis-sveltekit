import moment from 'moment';
import type { Trade } from '$lib/types';

export interface TradePageData {
  totalTrades: number;
  totalNetProfit: number;
  totalNetProfitPercentage: number;
  totalWins: number;
  totalLosses: number;
  winRatio: number;
  dailyPL: { [date: string]: number };
  averageDailyPL: number;
  cumulativeDailyPL: { [date: string]: number };
}

export function getTradePageData(trades: Trade[]): TradePageData {
  trades = trades.reverse();
  const totalTrades = trades.length;
  const totalNetProfit = trades.reduce((acc, trade) => acc + trade.netPL, 0);
  const totalNetProfitPercentage = trades.reduce(
    (acc, trade) => acc + trade.netROI,
    0
  );
  const totalWins = trades.filter((trade) => trade.netPL > 0).length;
  const totalLosses = trades.filter((trade) => trade.netPL < 0).length;
  const winRatio = totalWins / totalTrades;

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

  const cumulativeDailyPL: { [date: string]: number } = {};

  let cumulativePL = 0;
  const reversedKeys = Object.keys(dailyPL).reverse();
  for (var i = 0; i < reversedKeys.length; i++) {
    const date = reversedKeys[i];
    cumulativePL += dailyPL[date];
    cumulativeDailyPL[date] = cumulativePL;
  }

  const averageDailyPL =
    Object.values(dailyPL).reduce((acc, pl) => acc + pl, 0) /
    Object.keys(dailyPL).length;
  const toReturn = {
    totalTrades: roundToTwo(totalTrades),
    totalNetProfit: roundToTwo(totalNetProfit),
    totalNetProfitPercentage: roundToTwo(totalNetProfitPercentage),
    totalWins: roundToTwo(totalWins),
    totalLosses: roundToTwo(totalLosses),
    winRatio: roundToTwo(winRatio),
    dailyPL: dailyPL,
    averageDailyPL: roundToTwo(averageDailyPL),
    cumulativeDailyPL: cumulativeDailyPL,
  } as TradePageData;

  return toReturn;
}

function roundToTwo(num: number) {
  var pow = Math.pow(10, 2);
  return Math.round(num * pow) / pow;
}
