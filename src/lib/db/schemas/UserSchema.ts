import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import type { User } from '$lib/types';

interface IUser extends User, Document {
  id: string;
}

export default mongoose.models.User ||
  mongoose.model<IUser>(
    'User',
    new Schema({
      email: { type: String, required: true },
      fullName: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      id: { type: String, required: true },
      password_hash: { type: String, required: true },
    })
  );
