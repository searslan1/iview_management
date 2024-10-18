import mongoose from "mongoose";

export const InterviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  interviewLink: { type: String, required: true },
  uuid: { type: String, required: true, unique: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],  // Pakete ait sorular
  durations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],  // Soruların süreleri de Question'dan alınacak
});

export const Interview = mongoose.model("Interview", InterviewSchema);
