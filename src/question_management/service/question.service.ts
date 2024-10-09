import { IQuestion, Question } from '../entity/question';
import { QuestionRepository } from '../repository/question.repository';
import { IQuestionDTO } from '../dto/question.dto';

export class QuestionService {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  // Yeni bir soru oluştur
  public async createQuestion(questionData: IQuestionDTO): Promise<IQuestion> {
    // İş mantığı: Süre negatif olamaz
    if (questionData.duration <= 0) {
      throw new Error('Süre sıfırdan büyük olmalıdır.');
    }

    // İş mantığı: Tag sayısı minimum 1 olmalı
    if (!questionData.tags || questionData.tags.length === 0) {
      throw new Error('En az bir tag gereklidir.');
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
  public async getQuestionById(questionId: string): Promise<IQuestion | null> {
    const question = await this.questionRepository.getById(questionId);

    // Eğer soru bulunamazsa hata fırlat
    if (!question) {
      throw new Error('Soru bulunamadı.');
    }

    return question;
  }

  // Soru güncelleme işlemi
  public async updateQuestion(questionId: string, updateData: Partial<IQuestion>): Promise<IQuestion | null> {
    const question = await this.questionRepository.getById(questionId);

    // Eğer soru yoksa hata fırlat
    if (!question) {
      throw new Error('Güncellenmek istenen soru bulunamadı.');
    }

    // İş mantığı: Süre negatif olamaz
    if (updateData.duration !== undefined && updateData.duration <= 0) {
      throw new Error('Süre sıfırdan büyük olmalıdır.');
    }

    // Soru güncelleme işlemi
    return await this.questionRepository.update(questionId, updateData);
  }

  // Soru silme işlemi
  public async deleteQuestion(questionId: string): Promise<void> {
    const question = await this.questionRepository.getById(questionId);

    // Eğer soru yoksa hata fırlat
    if (!question) {
      throw new Error('Silinmek istenen soru bulunamadı.');
    }

    // Soru silme işlemi
    await this.questionRepository.delete(questionId);
  }
}
