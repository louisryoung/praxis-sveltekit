import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import TradeSchema from '$lib/db/schemas/TradeSchema';
import TradeInputSchema from '$lib/db/schemas/TradeInputSchema';
import { parseMongoDBObject, parseTrade } from '$lib/server/utils/mongodb';
import type { Actions, PageServerLoad } from './$types';
import { parseZodErrors } from '$lib/utils/zod';

export const load = (async ({ params, locals }) => {
  const { id } = params;
  const userID = locals?.user?.id ?? '';
  const trade = await TradeSchema.findOne({
    id,
    userID,
  });
  const nextTrade = TradeSchema.find({
    userID,
    closeDate: { $gt: trade.closeDate.getTime() },
  })
    .sort({ closeDate: 1 })
    .limit(1)
    .then((data) => ({ id: data?.[0]?.id }));
  const previousTrade = TradeSchema.find({
    userID,
    closeDate: { $lt: trade.closeDate.getTime() },
  })
    .sort({ closeDate: -1 })
    .limit(1)
    .then((data) => ({ id: data?.[0]?.id }));
  const inputs = TradeInputSchema.findOne({
    tradeID: id,
    userID,
  }).then(parseMongoDBObject);
  return {
    trade: parseTrade(parseMongoDBObject(trade)),
    inputs: inputs,
    nextTrade: nextTrade,
    previousTrade: previousTrade,
  };
}) satisfies PageServerLoad;

const profitTargetSchema = z.object({
  profitTarget: z.coerce.number({
    required_error: 'Profit target is required',
  }),
});
const stopLossSchema = z.object({
  stopLoss: z.coerce.number({ required_error: 'Stop loss is required' }),
});

const setupsSchema = z.object({
  setups: z.preprocess(
    (value) => JSON.parse(value),
    z.array(
      z.object({
        label: z.string().refine((value) => value.length > 0, {
          message: 'Setup name is required',
        }),
        value: z.string().refine((value) => value.length > 0, {
          message: 'Setup value is required',
        }),
      })
    )
  ),
});
const mistakesSchema = z.object({
  mistakes: z.preprocess(
    (value) => JSON.parse(value),
    z.array(
      z.object({
        label: z.string().refine((value) => value.length > 0, {
          message: 'Mistake name is required',
        }),
        value: z.string().refine((value) => value.length > 0, {
          message: 'Mistake value is required',
        }),
      })
    )
  ),
});

export const actions: Actions = {
  profit_target: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    const result = profitTargetSchema.safeParse(data);

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
  stop_loss: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    const result = stopLossSchema.safeParse(data);

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
  setups: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    const result = setupsSchema.safeParse(data);

    if (!result.success) {
      return fail(400, { errors: parseZodErrors(result) });
    }
    const setups = result.data.setups.map((setup) => setup.value);
    const { id } = params;
    const userID = locals?.user?.id ?? '';
    const tradeInput = await TradeInputSchema.updateOne(
      {
        tradeID: id,
        userID,
      },
      {
        $set: { setups },
      }
    );
    return { success: true };
  },
  mistakes: async ({ request, params, locals }) => {
    const data = Object.fromEntries(await request.formData());
    const result = mistakesSchema.safeParse(data);

    if (!result.success) {
      return fail(400, { errors: parseZodErrors(result) });
    }

    const mistakes = result.data.mistakes.map((e) => e.value);
    const { id } = params;
    const userID = locals?.user?.id ?? '';
    const tradeInput = await TradeInputSchema.updateOne(
      {
        tradeID: id,
        userID,
      },
      {
        $set: { mistakes },
      }
    );
    return { success: true };
  },
};
