import { Request, Response } from "express";
import CandidateService from "../service/candidate.service";
import { CreateCandidateDTO } from "../dto/candidate.dto";
import { Candidate } from "../models/candidate.schema";

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
      
      // Adayı kaydediyoruz
      const newCandidate = await this.candidateService.createCandidate(candidateDTO);
  
      // Mongoose dokümanını toObject ile normal JavaScript objesine çeviriyoruz
      res.status(201).json({ candidateId: newCandidate._id, ...newCandidate.toObject() });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  
  
  

  public getCandidateByInterviewId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { interviewId } = req.params;  // URL'den interviewId parametresini alıyoruz
  
      // Belirli bir mülakat ID'sine göre adayları bul
      const candidates = await Candidate.find({ interview: interviewId }, 'name surname videoUrl');  // Sadece gerekli alanları seçiyoruz
  
      if (candidates.length === 0) {
        res.status(404).json({ message: "Bu mülakata ait aday bulunamadı." });
        return;
      }
  
      // Aday bilgilerini döndürüyoruz
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
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
//adayın status bilgisi döner.
  public getCandidateStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;  // URL'den adayın id'sini alıyoruz
  
      const candidate = await this.candidateService.getCandidateById(id);
  
      if (!candidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
  
      // Adayın sadece status bilgisini döndürüyoruz
      res.status(200).json({ status: candidate.status });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  //frontendden gelen yeni statusu günceller
  public updateCandidateStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;  // URL'den adayın id'sini alıyoruz
      const { status } = req.body;  // frontend'den status alıyoruz
  
      if (!status) {
        res.status(400).json({ message: "Status is required" });
        return;
      }
  
      const updatedCandidate = await this.candidateService.updateCandidate(id, { status });
  
      if (!updatedCandidate) {
        res.status(404).json({ message: "Candidate not found" });
        return;
      }
  
      res.status(200).json(updatedCandidate);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  //toplam aday sayısı ve pending aday sayısını alır
  public getCandidateStatsByInterviewId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { interviewId } = req.params;
  
      // Toplam aday sayısı ve pending aday sayısını al
      const totalCandidates = await this.candidateService.getTotalCandidatesByInterviewId(interviewId);
      const pendingCandidates = await this.candidateService.getPendingCandidatesByInterviewId(interviewId);
  
      // Sonuçları döndür
      res.status(200).json({
        totalCandidates,
        pendingCandidates
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  

}
