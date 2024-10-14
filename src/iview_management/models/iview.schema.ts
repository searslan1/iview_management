import { Schema, model, Document } from 'mongoose';

export interface IInterview extends Document {
  title: string;
  questionPack: string;
  date: Date;
  link: string;
  totalVideos: number;
  pendingVideos: number;
}

const InterviewSchema: Schema = new Schema({
  title: { type: String, required: true },
  questionPack: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: true },
  totalVideos: { type: Number, default: 0 },
  pendingVideos: { type: Number, default: 0 },
});

export const Interview = model<IInterview>('Interview', InterviewSchema);
