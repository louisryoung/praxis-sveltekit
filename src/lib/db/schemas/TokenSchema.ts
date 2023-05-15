import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export default mongoose.models.Token ||
  mongoose.model<IToken>(
    'Token',
    new Schema({
      userId: { type: String, required: true },
      token: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      expiresAt: {
        type: Date,
        default: Date.now() + 1000 * 60 * 60 * 24 * 3 /*3 Days */,
      },
    })
  );
