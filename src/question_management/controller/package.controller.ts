import { Request, Response } from 'express';
import { Question } from '../entity/question';
import { PackageService } from '../service/package.service';
import { QuestionPackageRelation } from '../entity/package';

export class PackageController {
  private packageService: PackageService;

  

  constructor() {
    this.packageService = new PackageService();
  }

  // Belirli bir pakete ait soruları listeleme
  public async getQuestionsByPackage(req: Request, res: Response): Promise<void> {
    try {
      const { packageName } = req.query;
  
      if (!packageName) {
        res.status(400).json({ message: 'Paket adı gerekli' });
        return;
      }
  
      // Paket adını tags alanında arıyoruz
      const questions = await Question.find({ tags: packageName });
  
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Sorular listelenirken bir hata oluştu', error });
    }
  }
  


 // Paket-soru ilişkisini ve süresini güncelleme
public async updateRelation(req: Request, res: Response): Promise<void> {
  try {
    const { questionText, newQuestionText, newDuration } = req.body;

    if (!questionText || (newQuestionText === undefined && newDuration === undefined)) {
      res.status(400).json({ message: 'Geçerli bir Soru ID ve güncellenmiş veri gerekli' });
      return;
    }

    // İlgili soruyu bul
    const question = await Question.findOne({ questionText });

    if (!question) {
      res.status(404).json({ message: 'Soru bulunamadı' });
      return;
    }

    // Soru ID'si güncellenmişse, yeni değerini ata
    if (newQuestionText !== undefined) {
      question.questionText = newQuestionText;
    }

    // Süre güncellenmişse, yeni değerini ata
    if (newDuration !== undefined) {
      question.duration = newDuration;
    }

    await question.save();

    res.status(200).json({ message: 'Soru başarıyla güncellendi', question });
  } catch (error) {
    console.error('Error updating relation:', error);
    res.status(500).json({ message: 'Soru güncellenirken bir hata oluştu', error });
  }
}
  // Paket-soru ilişkisini silme
  public async deleteRelation(req: Request, res: Response): Promise<void> {
    try {
      const { questionText, packageName } = req.body;
  
      if (!questionText || !packageName) {
        res.status(400).json({ message: 'Soru ID ve paket adı gerekli' });
        return;
      }
  
      // İlgili soruyu bul
      const question = await Question.findOne({ questionText });
  
      if (!question) {
        res.status(404).json({ message: 'Soru bulunamadı' });
        return;
      }
  
      // Paket adını tags'ten çıkar
      question.tags = question.tags.filter(tag => tag !== packageName);
  
      // Eğer tags boş değilse, soruyu kaydet
      if (question.tags.length > 0) {
        await question.save();
      }
  
      // Tags boş kaldıysa sadece paket ilişkisini sil
      await QuestionPackageRelation.findOneAndDelete({ questionText, packageName });
  
      res.status(200).json({ message: 'Paket-soru ilişkisi başarıyla silindi', question });
    } catch (error) {
      console.error('Error deleting relation:', error);
      res.status(500).json({ message: 'Paket-soru ilişkisi silinirken bir hata oluştu', error });
    }
  }

  public async searchQuestions(req: Request, res: Response): Promise<void> {
    try {
      const { tag } = req.query;
      if (!tag) {
        res.status(400).json({ message: 'Tag gereklidir.' });
        return;
      }
      const questions = await this.packageService.searchQuestionsByTag(tag as string);
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error searching questions:', error);
      res.status(500).json({ message: 'Arama sırasında bir hata oluştu', error });
    }
  }  
}  

