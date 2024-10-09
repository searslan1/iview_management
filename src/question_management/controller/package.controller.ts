import { Request, Response } from 'express';
import {QuestionPackageRelation} from '../entity/package';
import {Question} from '../entity/question';

class QuestionPackageController {
  
  // Yeni bir paket-soru ilişkisi ekleme
  public async addRelation(req: Request, res: Response): Promise<void> {
    try {
      const { questionId, packageName } = req.body;

      if (!questionId || !packageName) {
        res.status(400).json({ message: 'Soru ID ve paket adı gerekli' });
        return;
      }

      // Yeni ilişki oluşturma
      const newRelation = new QuestionPackageRelation({
        questionId,
        packageName,
      });

      // Veritabanına kaydetme
      await newRelation.save();
      res.status(201).json({ message: 'Paket-soru ilişkisi başarıyla eklendi', newRelation });
    } catch (error) {
      res.status(500).json({ message: 'Paket-soru ilişkisi eklenirken bir hata oluştu', error });
    }
  }

  // Belirli bir pakete ait soruları listeleme
  public async getQuestionsByPackage(req: Request, res: Response): Promise<void> {
    try {
      const { packageName } = req.query;

      if (!packageName) {
        res.status(400).json({ message: 'Paket adı gerekli' });
        return;
      }

      // Paket adına göre ilişkileri bul
      const relations = await QuestionPackageRelation.find({ packageName });
      const questionIds = relations.map(relation => relation.questionId);

      // İlgili soruları veritabanından çek
      const questions = await Question.find({ questionId: { $in: questionIds } });

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Sorular listelenirken bir hata oluştu', error });
    }
  }

  // Paket-soru ilişkisini güncelleme
  public async updateRelation(req: Request, res: Response): Promise<void> {
    try {
      const { questionId, newPackageName } = req.body;

      if (!questionId || !newPackageName) {
        res.status(400).json({ message: 'Soru ID ve yeni paket adı gerekli' });
        return;
      }

      // Mevcut ilişkiyi bul ve güncelle
      const relation = await QuestionPackageRelation.findOne({ questionId });

      if (!relation) {
        res.status(404).json({ message: 'Paket-soru ilişkisi bulunamadı' });
        return;
      }

      relation.packageName = newPackageName;
      await relation.save();

      res.status(200).json({ message: 'Paket-soru ilişkisi başarıyla güncellendi', relation });
    } catch (error) {
      res.status(500).json({ message: 'Paket-soru ilişkisi güncellenirken bir hata oluştu', error });
    }
  }

  // Paket-soru ilişkisini silme
  public async deleteRelation(req: Request, res: Response): Promise<void> {
    try {
      const { questionId, packageName } = req.body;

      if (!questionId || !packageName) {
        res.status(400).json({ message: 'Soru ID ve paket adı gerekli' });
        return;
      }

      // İlişkiyi bul ve sil
      const deletedRelation = await QuestionPackageRelation.findOneAndDelete({ questionId, packageName });

      if (!deletedRelation) {
        res.status(404).json({ message: 'Paket-soru ilişkisi bulunamadı' });
        return;
      }

      res.status(200).json({ message: 'Paket-soru ilişkisi başarıyla silindi', deletedRelation });
    } catch (error) {
      res.status(500).json({ message: 'Paket-soru ilişkisi silinirken bir hata oluştu', error });
    }
  }
}

export default new QuestionPackageController();
