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
      const { questionText, tags, duration } = req.body;

     if (!questionText || questionText.trim() === "" || !duration || !tags || !Array.isArray(tags) || tags.length === 0) {
    res.status(400).json({ message: 'Geçerli bir Soru ID, süre ve en az bir etiket gereklidir' });
    return;
}

      // Service katmanına istek gönderiyoruz
      const newQuestion = await this.questionService.createQuestion({
        questionText,
        tags,
        duration,
      } as IQuestionDTO);

      // Başarılı yanıt
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  // Tüm soruları listeleme işlemi
  public getAllQuestions = async (_req: Request, res: Response): Promise<void> => {
    try {
      const questions = await this.questionService.getQuestions();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
 // Soru güncelleme işlemi
 public updateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionText, duration, tags } = req.body;

    if (!questionText) {
      res.status(400).json({ message: 'Soru ID gerekli' });
      return;
    }

    // Service katmanına istek gönderiyoruz
    const updatedQuestion = await this.questionService.updateQuestion({
      questionText,
      duration,
      tags,
    } as IQuestionDTO);

    // Başarılı yanıt
    res.status(200).json({ message: 'Soru başarıyla güncellendi', updatedQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Soru güncellenirken bir hata oluştu', error });
  }
};
   // Soru silme işlemi
   public deleteQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
      const { questionText } = req.body;

      if (!questionText) {
        res.status(400).json({ message: 'Soru ID gerekli' });
        return;
      }

      // Service katmanına istek göndererek soruyu sil
      const deletedQuestion = await this.questionService.deleteQuestion(questionText);

      if (!deletedQuestion) {
        res.status(404).json({ message: 'Soru bulunamadı' });
        return;
      }

      res.status(200).json({ message: 'Soru başarıyla silindi', deletedQuestion });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
}

