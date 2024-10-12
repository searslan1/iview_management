import { Schema, model, Document } from "mongoose";

export interface IQuestion extends Document {
  questionText: string;
  duration: number;
  tags: string[];
  order: number;
}

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true }, // Tutarlılık için questionText kullandık
  duration: { type: Number, required: true },
  tags: [{ type: String, required: true }],
  order: { type: Number, required: true },
});

export const Question = model<IQuestion>("Question", QuestionSchema);
