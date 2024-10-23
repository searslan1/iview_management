import { Request, Response } from "express";
import InterviewService from "../service/iview.service";
import { CreateInterviewDTO } from "../dto/iview.dto";
import { v4 as uuidv4 } from 'uuid';
import { Question } from "../../question_management/entity/question";
import { Interview } from "../models/iview.schema";


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
      const { title, packageName, expireDate } = req.body; // frontend'den gelen veriler
  
      // packageName (tags) ile soruları buluyoruz
      const questions = await Question.find({
        tags: { $regex: new RegExp(packageName, "i") }  // Küçük/büyük harf duyarsız arama
      });


      // Soruların ID'lerini string olarak map'liyoruz
      const questionIds = questions.map((q) => q._id);
      // UUID ile benzersiz bir link oluşturuyoruz
      const interviewLink = uuidv4(); // Benzersiz link
  
      // Interview DTO'yu oluşturuyoruz
      const interviewDTO = new CreateInterviewDTO({
        title,
        date: new Date(expireDate),
        questions: questionIds,
      });

      if (!Date.parse(expireDate)) {
        throw new Error("Invalid date format");
      }
      
      // Yeni mülakat nesnesini oluşturuyoruz ve link'i ekliyoruz
      const newInterview = {
        ...interviewDTO,
        link: interviewLink, // Link oluşturuluyor
      };
  
      // Servis katmanında yeni interview'u kaydediyoruz
      const createdInterview = await this.interviewService.createInterview(newInterview);
  
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
      // Interview modelini populate ile sorularla birlikte getiriyoruz
      const interviews = await Interview.find().populate('questions', 'questionText duration');
  
      res.status(200).json(interviews);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
  


  public getInterviewByLink = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const interview = await this.interviewService.getInterviewByLink(req.params.interviewId);
      
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
  
  public getInterviewById = async (req: Request, res: Response): Promise<void> => {
    try {
      const interview = await this.interviewService.getInterviewById(req.params.id);
  
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
  
  

  /* public updateInterview = async (
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
*/
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
