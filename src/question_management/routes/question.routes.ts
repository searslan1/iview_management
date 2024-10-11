import { Router } from 'express';
import { QuestionController } from '../controller/question.controller';

const router = Router();
const questionController = new QuestionController();


router.post('/create', questionController.createQuestion);       // Yeni soru oluştur
router.get('/', questionController.getAllQuestions);      // Tüm soruları getir
router.delete('/delete', questionController.deleteQuestion);
router.put('/update', questionController.updateQuestion);
export default router;
