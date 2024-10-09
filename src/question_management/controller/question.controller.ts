import { Request, Response } from 'express';
import { QuestionService } from '../service/question.service';
import { IQuestionDTO } from '../dto/question.dto';

export class QuestionController {
  private questionService: QuestionService;

  constructor() {
    this.questionService = new QuestionService();
  }

  // Yeni bir soru oluşturma işlemi
  public createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { questionId, tags, duration } = req.body;

      // Service katmanına istek gönderiyoruz
      const newQuestion = await this.questionService.createQuestion({
        questionId,
        tags,
        duration,
      } as IQuestionDTO);

      // Başarılı yanıt
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(400).json({ error: onmessage });
    }
  };

  // Tüm soruları listeleme işlemi
  public getAllQuestions = async (_req: Request, res: Response): Promise<void> => {
    try {
      const questions = await this.questionService.getQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: onmessage });
    }
  };

  // Belirli bir soru ID'si ile soruyu getirme
  public getQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const question = await this.questionService.getQuestionById(id);

      if (!question) {
         res.status(404).json({ message: 'Soru bulunamadı.' });
         return;
      }

      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: onmessage });
    }
  };

  // Belirli bir soru ID'si ile soruyu güncelleme işlemi
  public updateQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedQuestion = await this.questionService.updateQuestion(id, updateData);

      if (!updatedQuestion) {
        res.status(404).json({ message: 'Soru bulunamadı.' });
        return ;
      }

      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(400).json({ error: onmessage });
    }
  };

  // Belirli bir soru ID'si ile soruyu silme işlemi
  public deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      await this.questionService.deleteQuestion(id);
      res.status(204).send(); // Silme işlemi başarılıysa, 204 No Content döndürülür.
    } catch (error) {
      res.status(400).json({ error: onmessage });
    }
  };
}
