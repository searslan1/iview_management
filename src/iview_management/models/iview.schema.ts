import mongoose from "mongoose";

export const InterviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: false},  // link alanını tutuyoruz
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],  // Pakete ait sorular
});

export const Interview = mongoose.model("Interview", InterviewSchema);
