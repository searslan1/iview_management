import { IQuestionDTO } from "../dto/question.dto";
import { Question, IQuestion } from "../entity/question";

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
  public async getById(questionText: string): Promise<IQuestion | null> {
    return await Question.findOne({ questionText });
  }

  // Soru güncelleme işlemi
  public async updateQuestion(
    questionText: string,
    duration?: number,
    tags?: string[]
  ): Promise<IQuestionDTO | null> {
    // İlgili soruyu bul
    const question = await Question.findOne({ questionText });
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
  public async deleteQuestion(questionText: string): Promise<IQuestion | null> {
    return await Question.findOneAndDelete({ questionText });
  }
  public async reorderQuestions(
    reorderedQuestions: IQuestion[]
  ): Promise<void> {
    for (let i = 0; i < reorderedQuestions.length; i++) {
      const questionId = reorderedQuestions[i]._id;
      const newOrder = i;
      await Question.findByIdAndUpdate(questionId, { order: newOrder });
    }
  }
}
