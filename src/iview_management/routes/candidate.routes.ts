import { Router } from "express";
import { CandidateController } from "../controller/candidate.controller";


const candidateController = new CandidateController();
const router = Router();

// Candidate routes
router.post("/submit", CandidateController.createCandidate);
router.get("/candidates/:id", CandidateController.getCandidateById);
router.put("/candidates/:id", candidateController.updateCandidate);
router.delete("/candidates/:id", candidateController.deleteCandidate);

// Get candidates by interview ID
router.get(
  "/interviews/:interviewId/candidates",
  candidateController.getCandidatesByInterviewId
);



export default router;