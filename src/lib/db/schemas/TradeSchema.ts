import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import type { Trade, Order } from '$lib/types';

interface ITrade extends Trade, Document {
  id: string;
}

export default mongoose.models.Trade ||
  mongoose.model<ITrade>(
    'Trade',
    new Schema({
      id: { type: String, required: true },
      userID: { type: String, required: true },
      tradeAccountID: { type: String, required: true },
      symbol: { type: String, required: true },
      strike: { type: Number, required: true },
      type: { type: String, required: true },
      qty: { type: Number, required: true },
      orders: { type: Array<Order>(), required: true },
      status: { type: String, required: true },
      openDate: { type: Date, required: true },
      closeDate: { type: Date, required: true },
      entryPrice: { type: Number, required: true },
      exitPrice: { type: Number, required: true },
      netPL: { type: Number, required: true },
      netROI: { type: Number, required: true },
      expiration: { type: Date, required: true },
      totalFee: { type: Number, required: true },
      log_day: { type: String, required: true },
      log_month: { type: String, required: true },
      log_week: { type: String, required: true },
    })
  );
