import { Schema, model, Document } from 'mongoose';

export interface IQuestionPackageRelation extends Document {
  questionId: string; // Soru ID'si
  packageName: string; // Paket adı
}

const QuestionPackageRelationSchema: Schema = new Schema({
  questionId: { type: String, required: true },
  packageName: { type: String, required: true },
});

export const QuestionPackageRelation = model<IQuestionPackageRelation>('QuestionPackageRelation', QuestionPackageRelationSchema);
