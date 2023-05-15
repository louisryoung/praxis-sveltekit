import { fail } from '@sveltejs/kit';
import moment from 'moment';
import { z } from 'zod';
import NotebookSchema from '$lib/db/schemas/NotebookSchema';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import TradeInputSchema from '$lib/db/schemas/TradeInputSchema';
import { parseMongoDBObject, parseTrade } from '$lib/server/utils/mongodb';
import { parseZodErrors } from '$lib/utils/zod';
import type { Trade } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const { id, type } = params;
  const userID = locals?.user?.id ?? '';
  const notebook = new Promise(async (resolve, reject) => {
    const nb = await NotebookSchema.findOne({
      date: id,
      userID,
    });
    if (nb) {
      return resolve(nb);
    }
    const newNote = await NotebookSchema.create({
      date: id,
      type: type.toUpperCase(),
      userID,
      feelings: [],
      notes: [],
    });

    resolve(newNote);
  }).then(parseMongoDBObject);
  const [year, month, day = 1] = id.split('-').map(Number);
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  if (type.toUpperCase() === 'MONTH') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setDate(endDate.getDate() + 1);
  }
  const trades = TradeSchema.find({
    userID,
    closeDate: {
      $gte: startDate,
      $lt: endDate,
    },
  })
    .sort({ openDate: 1 })
    .then((data) => data.map(parseMongoDBObject).map(parseTrade));

  return {
    notebook: notebook,
    trades,
    tradeData: trades.then((data) => getTradeDate(data, type.toUpperCase())),
  };
}) satisfies PageServerLoad;

const getTradeDate = (trades: Trade[], type: 'DAY' | 'MONTH') => {
  if (trades.length === 0) {
    return {
      chartData: [],
      totalNetProfit: 0,
    };
  }
  let chartData: Record<string, number> = {};
  if (type === 'DAY') {
    chartData = trades.reduce((acc, trade) => {
      acc[trade.closeDate.toISOString()] = trade.netPL;
      return acc;
    }, {} as Record<string, number>);
  } else {
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
    chartData = cumulativeDailyPL;
  }

  const totalNetProfit = trades.reduce((acc, trade) => acc + trade.netPL, 0);
  return {
    chartData,
    totalNetProfit,
  };
};

const setupsSchema = z.array(
  z.string().refine((value) => value.length > 0, {
    message: 'Setup is required',
  })
);
const mistakesSchema = z.array(
  z.string().refine((value) => value.length > 0, {
    message: 'Mistake is required',
  })
);

export const actions: Actions = {
  setups: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    console.log({ data });
    return fail(400);
    const result = setupsSchema.safeParse(data);

    if (!result.success) {
      return fail(400, { errors: parseZodErrors(result) });
    }

    const { profitTarget } = result.data;
    const { id } = params;
    const userID = locals?.user?.id ?? '';
    const tradeInput = await TradeInputSchema.updateOne(
      {
        tradeID: id,
        userID,
      },
      {
        $set: { profitTarget },
      }
    );
    return { success: true };
  },
  mistakes: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    console.log({ data });
    return fail(400);
    const result = mistakesSchema.safeParse(data);

    if (!result.success) {
      return fail(400, { errors: parseZodErrors(result) });
    }

    const { stopLoss } = result.data;
    const { id } = params;
    const userID = locals?.user?.id ?? '';
    const tradeInput = await TradeInputSchema.updateOne(
      {
        tradeID: id,
        userID,
      },
      {
        $set: { stopLoss },
      }
    );
    return { success: true };
  },
};
