import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import type { TradeAcct } from '$lib/types';

interface ITradeAcct extends TradeAcct, Document {
  id: string;
}

export default mongoose.models.TradingAccount ||
  mongoose.model<ITradeAcct>(
    'TradingAccount',
    new Schema({
      createdAt: { type: Date, default: Date.now },
      id: { type: String, required: true },
      name: { type: String, required: true },
      userID: { type: String, required: true },
    })
  );
