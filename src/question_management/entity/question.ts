import { Schema, model, Document } from 'mongoose';

export interface IQuestion extends Document {
  questionId: string;
  duration: number;
  tags: string[];
}

const QuestionSchema: Schema = new Schema({
  questionId: { type: String, required: true, unique: true },  // Tutarlılık için questionId kullandık
  duration: { type: Number, required: true },
  tags: [{ type: String }],
});

export const Question = model<IQuestion>('Question', QuestionSchema);
