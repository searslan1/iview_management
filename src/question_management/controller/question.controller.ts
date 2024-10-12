import { Request, Response } from "express";
import { QuestionService } from "../service/question.service";
import { IQuestionDTO } from "../dto/question.dto";
import { Question } from "../entity/question";



export class QuestionController {
  private questionService: QuestionService;

  constructor() {
    this.questionService = new QuestionService();
  }

  // Yeni bir soru oluşturma işlemi
  public createQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { questionText, tags, duration } = req.body;

      // Veritabanındaki mevcut soru sayısını alarak sıradaki `order` değerini hesaplıyoruz
      const questionCount = await Question.countDocuments();

      // DTO formatında yeni soruyu oluşturuyoruz
      const newQuestionData: IQuestionDTO = {
        questionText,
        tags,
        duration,
        order: questionCount + 1, // Yeni soruya sıradaki `order` değerini veriyoruz
      };

      // DTO'yu kullanarak yeni soruyu kaydediyoruz
      const newQuestion = new Question(newQuestionData);
      await newQuestion.save();

      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // Tüm soruları listeleme işlemi
  public getAllQuestions = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Soruları `order` alanına göre sıralayarak getiriyoruz (artan sırada)
      const questions = await Question.find().sort({ order: 1 });
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // Soru güncelleme işlemi
  public updateQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const questionId = req.params.id;
      const { questionText, duration, tags } = req.body;

      // Gelen ID kontrol ediliyor
      if (!questionId) {
        res.status(400).json({ message: "Soru ID gerekli" });
        return;
      }

      // Güncellenecek soru verileri kontrol ediliyor
      if (!questionText || questionText.trim() === "") {
        res.status(400).json({ message: "Soru metni gerekli" });
        return;
      }

      // Service katmanına istek gönderiyoruz
      const updatedQuestion = await this.questionService.updateQuestion(
        questionId, // ID'yi burada kullanıyoruz
        {
          questionText,
          duration,
          tags,
        } as IQuestionDTO
      );

      if (!updatedQuestion) {
        res.status(404).json({ message: "Soru bulunamadı" });
        return;
      }

      // Başarılı yanıt
      res
        .status(200)
        .json({ message: "Soru başarıyla güncellendi", updatedQuestion });
    } catch (error) {
      console.error("Error updating question:", error);
      res
        .status(500)
        .json({ message: "Soru güncellenirken bir hata oluştu", error });
    }
  };

  // Soru silme işlemi
  public deleteQuestion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const questionId = req.params.id; // ID URL'den alınıyor

      // Gelen ID kontrol ediliyor
      if (!questionId) {
        res.status(400).json({ message: "Soru ID gerekli" });
        return;
      }

      // Service katmanına ID ile istek gönderiyoruz
      const deletedQuestion = await this.questionService.deleteQuestion(
        questionId
      );

      if (!deletedQuestion) {
        res.status(404).json({ message: "Soru bulunamadı" });
        return;
      }

      // Başarılı silme yanıtı
      res
        .status(200)
        .json({ message: "Soru başarıyla silindi", deletedQuestion });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu",
      });
    }
  };
  public reorderQuestions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { reorderedQuestions } = req.body;

      // Service katmanına istek gönderiyoruz
      await this.questionService.reorderQuestions(reorderedQuestions);

      res.status(200).json({ message: "Questions reordered successfully" });
    } catch (error) {
      console.error("Error reordering questions in controller:", error);
      res.status(500).json({ message: "Error reordering questions", error });
    }
  };
}
