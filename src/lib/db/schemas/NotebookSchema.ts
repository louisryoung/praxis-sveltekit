import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import type { Notebook } from '$lib/types';

interface INotebook extends Notebook, Document {}

export default mongoose.models.Notebook ||
  mongoose.model<INotebook>(
    'Notebook',
    new Schema({
      userID: { type: String, required: true },
      type: { type: String, required: true },
      date: { type: String, required: true },
      feelings: { type: [String], required: false },
      rating: { type: Number, required: false },
      notes: {
        howdidifeel: { type: String, required: false },
        whatwentwell: { type: String, required: false },
        whatcouldbeimproved: { type: String, required: false },
        continue: { type: String, required: false },
        improve: { type: String, required: false },
        start: { type: String, required: false },
        stop: { type: String, required: false },
      },
    })
  );
