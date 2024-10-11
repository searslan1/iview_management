import { Router, Request, Response } from 'express';
import { AddRelationDto, UpdateRelationDto, DeleteRelationDto } from '../dto/package.dto';
import {PackageController} from '../controller/package.controller';

const router = Router();
const packageController = new PackageController();



// Belirli bir pakete ait ilişkili soruları getirme
router.get('/questions', (req: Request, res: Response) => {
    packageController.getQuestionsByPackage(req, res);
  });
  

// Paket-soru ilişkisini güncelleme
router.put('/update-relation', (req: Request, res: Response) => {
    packageController.updateRelation(req, res);
  });
  
  // Paket-soru ilişkisini silme
  router.delete('/delete-relation', (req: Request, res: Response) => {
    packageController.deleteRelation(req, res);
  });
  
  router.get('/search', (req: Request, res: Response) => {
    packageController.searchQuestions(req, res);
  });
  

export default router;
