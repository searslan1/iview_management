import { Router } from 'express';
import { QuestionController } from '../controller/question.controller';

const router = Router();
const questionController = new QuestionController();

// API Route'ları
router.post('/questions', questionController.createQuestion);       // Yeni soru oluştur
router.get('/questions', questionController.getAllQuestions);       // Tüm soruları getir
router.get('/questions/:id', questionController.getQuestionById);   // Belirli bir soruyu getir
router.put('/questions/:id', questionController.updateQuestion);    // Belirli bir soruyu güncelle
router.delete('/questions/:id', questionController.deleteQuestion); // Belirli bir soruyu sil

export default router;
