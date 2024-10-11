import { IQuestionDTO } from '../dto/question.dto';
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

 // Soru güncelleme işlemi
 public async updateQuestion(questionId: string, duration?: number, tags?: string[]): Promise<IQuestionDTO | null> {
  // İlgili soruyu bul
  const question = await Question.findOne({ questionId });
  if (!question) {
    return null;
  }

  // Soru süresi güncellenmişse, duration alanını güncelle
  if (duration !== undefined) {
    question.duration = duration;
  }

  // Tags güncellenmişse, tags alanını güncelle
  if (tags !== undefined) {
    question.tags = tags;
  }

  // Güncellemeyi veritabanına kaydet
  await question.save();

  return question;
}

  // Soru silme
  public async deleteQuestion(questionId: string): Promise<IQuestion | null> {
    return await Question.findOneAndDelete({ questionId });
  }
}
