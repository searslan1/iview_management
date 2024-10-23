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
router.get("/link/:link", interviewController.getInterviewByLink);
/* router.put("/interviews/:id", interviewController.updateInterview); */
router.delete("/delete/:id", interviewController.deleteInterview);

// Candidate routes
router.post("/candidates", candidateController.createCandidate);
router.get("/candidates/:id", candidateController.getCandidateById);
router.put("/candidates/:id", candidateController.updateCandidate);
router.delete("/candidates/:id", candidateController.deleteCandidate);

// Get candidates by interview ID
router.get(
  "/interviews/:interviewId/candidates",
  candidateController.getCandidatesByInterviewId
);

export default router;
