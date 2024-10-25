import { Router } from "express";
import { InterviewController } from "../controller/iview.controller";
import { CandidateController } from "../controller/candidate.controller";

const interviewController = new InterviewController();
const candidateController = new CandidateController();

const router = Router();

// Interview routes
router.post("/create", interviewController.createInterview);
router.get("/interviews", interviewController.getAllInterviews);
router.get("/:id", interviewController.getInterviewById); // Interview'ı ID'ye göre getir
router.get("/link/:interviewId", interviewController.getInterviewByLink);
/* router.put("/interviews/:id", interviewController.updateInterview); */
router.delete("/delete/:id", interviewController.deleteInterview);


export default router;
