import { Router } from 'express';
import { InterviewController } from '../controller/iview.controller';

const router = Router();
const interviewController = new InterviewController();

// Mülakat ekleme
router.post('/create', interviewController.createInterview.bind(interviewController));

// Mülakatları listeleme
router.get('/', interviewController.getAllInterviews.bind(interviewController));

export default router;
