import { Request, Response } from "express";
import CandidateService from "../service/candidate.service";
import { CreateCandidateDTO } from "../dto/candidate.dto";

export class CandidateController {
  private candidateService: CandidateService;

  constructor() {
    this.candidateService = new CandidateService();
  }

  public createCandidate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const candidateDTO = new CreateCandidateDTO(req.body);
      const newCandidate = await this.candidateService.createCandidate(
        candidateDTO
      );
      res.status(201).json(newCandidate);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getCandidateById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const candidate = await this.candidateService.getCandidateById(
        req.params.id
      );
      if (!candidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
      res.status(200).json(candidate);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateCandidate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const updatedCandidate = await this.candidateService.updateCandidate(
        req.params.id,
        req.body
      );
      if (!updatedCandidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
      res.status(200).json(updatedCandidate);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteCandidate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const deletedCandidate = await this.candidateService.deleteCandidate(
        req.params.id
      );
      if (!deletedCandidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Candidate deleted successfully", deletedCandidate });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getCandidatesByInterviewId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const candidates = await this.candidateService.getCandidatesByInterviewId(
        req.params.interviewId
      );
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
