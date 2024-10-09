import { Router, Request, Response } from 'express';
import { QuestionPackageService } from '../service/package.service';
import { AddRelationDto, UpdateRelationDto, DeleteRelationDto } from '../dto/package.dto';

const router = Router();
const questionPackageService = new QuestionPackageService();

// Yeni bir paket-soru ilişkisi ekleme
router.post('/add-relation', async (req: Request, res: Response) => {
  try {
    const addRelationDto: AddRelationDto = req.body;
    const newRelation = await questionPackageService.addRelation(addRelationDto);
    res.status(201).json({ message: 'Paket-soru ilişkisi başarıyla eklendi', newRelation });
  } catch (error) {
    res.status(500).json({ message: 'Paket-soru ilişkisi eklenirken bir hata oluştu', error });
  }
});

// Belirli bir pakete ait ilişkili soruları getirme
router.get('/questions/:packageName', async (req: Request, res: Response) => {
  try {
    const { packageName } = req.params;
    const questionIds = await questionPackageService.getQuestionsByPackage(packageName);
    res.status(200).json({ questionIds });
  } catch (error) {
    res.status(500).json({ message: 'Sorular listelenirken bir hata oluştu', error });
  }
});

// Paket-soru ilişkisini güncelleme
router.put('/update-relation', async (req: Request, res: Response) => {
  try {
    const updateRelationDto: UpdateRelationDto = req.body;
    const updatedRelation = await questionPackageService.updateRelation(updateRelationDto);
    if (!updatedRelation) {
      res.status(404).json({ message: 'Paket-soru ilişkisi bulunamadı' });
      return;
    }
    res.status(200).json({ message: 'Paket-soru ilişkisi başarıyla güncellendi', updatedRelation });
  } catch (error) {
    res.status(500).json({ message: 'Paket-soru ilişkisi güncellenirken bir hata oluştu', error });
  }
});

// Paket-soru ilişkisini silme
router.delete('/delete-relation', async (req: Request, res: Response) => {
  try {
    const deleteRelationDto: DeleteRelationDto = req.body;
    const deletedRelation = await questionPackageService.deleteRelation(deleteRelationDto);
    if (!deletedRelation) {
      res.status(404).json({ message: 'Paket-soru ilişkisi bulunamadı' });
      return;
    }
    res.status(200).json({ message: 'Paket-soru ilişkisi başarıyla silindi', deletedRelation });
  } catch (error) {
    res.status(500).json({ message: 'Paket-soru ilişkisi silinirken bir hata oluştu', error });
  }
});

export default router;
