import { IQuestion, Question } from "../entity/question";
import { QuestionRepository } from "../repository/question.repository";
import { IQuestionDTO } from "../dto/question.dto";

export class QuestionService {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  // Yeni bir soru oluştur
  public async createQuestion(questionData: IQuestionDTO): Promise<IQuestion> {
    // İş mantığı: Süre negatif olamaz
    if (questionData.duration <= 0) {
      throw new Error("Süre sıfırdan büyük olmalıdır.");
    }

    // İş mantığı: Tag sayısı minimum 1 olmalı
    if (!questionData.tags || questionData.tags.length === 0) {
      throw new Error("En az bir tag gereklidir.");
    }
    const question = new Question(questionData);
    // Soru oluşturma işlemi
    return await question.save();
  }

  // Tüm soruları getir
  public async getQuestions(): Promise<IQuestion[]> {
    return await this.questionRepository.getAll();
  }

  // Belirli ID ile bir soru getir
  public async getQuestionById(
    questionText: string
  ): Promise<IQuestion | null> {
    const question = await this.questionRepository.getById(questionText);

    // Eğer soru bulunamazsa hata fırlat
    if (!question) {
      throw new Error("Soru bulunamadı.");
    }

    return question;
  }

  // Soru güncelleme işlemi
  public async updateQuestion(
    id: string,
    updatedData: IQuestionDTO
  ): Promise<IQuestion | null> {
    return await Question.findByIdAndUpdate(id, updatedData, { new: true });
  }

  // Soru silme işlemi
  public async deleteQuestion(questionId: string): Promise<IQuestion | null> {
    return await Question.findByIdAndDelete(questionId);
  }
  public async reorderQuestions(
    reorderedQuestions: IQuestion[]
  ): Promise<void> {
    try {
      for (let i = 0; i < reorderedQuestions.length; i++) {
        const questionId = reorderedQuestions[i]._id;
        const newOrder = i; // Yeni sıraya göre `order` değeri ayarlanır
        await Question.findByIdAndUpdate(questionId, { order: newOrder });
      }
    } catch (error) {
      console.error("Error reordering questions in service:", error);
      throw new Error("Soru sıralama işlemi sırasında bir hata oluştu.");
    }
  }
}
