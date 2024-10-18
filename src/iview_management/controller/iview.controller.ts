import { Request, Response } from "express";
import InterviewService from "../service/iview.service";
import { CreateInterviewDTO } from "../dto/iview.dto";
import { IQuestionDTO } from "../../question_management/dto/question.dto";
export class InterviewController {
  private interviewService: InterviewService;

  constructor() {
    this.interviewService = new InterviewService();
  }

  public createInterview = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { title, packageName, expireDate } = req.body; // packageName frontend'den tags olarak geliyor

      // Interview DTO'yu oluşturuyoruz
      const interviewDTO = new CreateInterviewDTO({
        title,
        date: expireDate,
        interviewLink: "some_generated_link",
        uuid: "some_generated_uuid",
        candidates: [], // Boş bir aday listesi
      });

      // DTO'yu tags eklemeden işliyoruz
      const newInterview = {
        ...interviewDTO,
        tags: packageName, // packageName'i tags olarak ekliyoruz
      };

      // Servis katmanında yeni interview'u kaydediyoruz
      const createdInterview = await this.interviewService.createInterview(
        newInterview
      );

      res.status(201).json(createdInterview);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getAllInterviews = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const interviews = await this.interviewService.getAllInterviews();
      res.status(200).json(interviews);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getInterviewById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const interview = await this.interviewService.getInterviewById(
        req.params.id
      );
      if (!interview) {
        res.status(404).json({ message: "Interview not found" });
        return;
      }
      res.status(200).json(interview);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateInterview = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const updatedInterview = await this.interviewService.updateInterview(
        req.params.id,
        req.body
      );
      if (!updatedInterview) {
        res.status(404).json({ message: "Interview not found" });
        return;
      }
      res.status(200).json(updatedInterview);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteInterview = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const deletedInterview = await this.interviewService.deleteInterview(
        req.params.id
      );
      if (!deletedInterview) {
        res.status(404).json({ message: "Interview not found" });
        return;
      }
      res
        .status(200)
        .json({ message: "Interview deleted successfully", deletedInterview });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
