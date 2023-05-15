import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import type { TradeInput } from '$lib/types';

interface ITradeInput extends TradeInput, Document {}

export default mongoose.models.TradeInput ||
  mongoose.model<ITradeInput>(
    'TradeInput',
    new Schema({
      userID: { type: String, required: true },
      tradeID: { type: String, required: true },
      feelings: { type: [String] },
      notes: {
        whyEntered: { type: String },
        managed: { type: String },
        errors: { type: String },
        improvements: { type: String },
      },
      setups: { type: [String] },
      mistakes: { type: [String] },
      tradeRating: { type: Number },
      profitTarget: { type: Number },
      stopLoss: { type: Number },
    })
  );
