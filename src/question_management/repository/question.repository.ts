import { Question, IQuestion } from '../entity/question';

// Soru repository fonksiyonları burada yönetilir.
export class QuestionRepository {
  // Yeni bir soru kaydetme
  public async save(questionData: IQuestion): Promise<IQuestion> {
    const question = new Question(questionData);
    return await question.save();
  }

  // Tüm soruları listeleme
  public async getAll(): Promise<IQuestion[]> {
    return await Question.find();
  }

  // Soru ID ile bir soru bulma
  public async getById(questionId: string): Promise<IQuestion | null> {
    return await Question.findOne({ questionId });
  }

  // Soruyu güncelleme
  public async update(questionId: string, updateData: Partial<IQuestion>): Promise<IQuestion | null> {
    return await Question.findOneAndUpdate({ questionId }, updateData, { new: true });
  }

  // Soru silme
  public async delete(questionId: string): Promise<void> {
    await Question.deleteOne({ questionId });
  }
}
