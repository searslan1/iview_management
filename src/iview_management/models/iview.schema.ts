import mongoose, { Schema, model, Document, Types } from "mongoose";
export interface IInterview extends Document {
  title: string;
  date: Date;
  link?: string;
  questions: Types.ObjectId[];  // Burada ObjectId dizisi kullanıyoruz
}
export const InterviewSchema = new Schema<IInterview>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: false },  // link alanını tutuyoruz
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],  // Pakete ait sorular
});
export const Interview = model<IInterview>("Interview", InterviewSchema);