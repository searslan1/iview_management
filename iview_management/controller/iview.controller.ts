import { Request, Response } from 'express';
import { InterviewService } from '../service/iview.service';
import { IInterviewDTO } from '../dto/iview.dto';

export class InterviewController {
  private interviewService: InterviewService;

  constructor() {
    this.interviewService = new InterviewService();
  }

  public async createInterview(req: Request, res: Response): Promise<void> {
    try {
      const interviewData: IInterviewDTO = req.body;
      const newInterview = await this.interviewService.createInterview(interviewData);
      res.status(201).json(newInterview);
    } catch (error) {
      res.status(500).json({ message: 'Mülakat eklenirken bir hata oluştu', error });
    }
  }

  public async getAllInterviews(req: Request, res: Response): Promise<void> {
    try {
      const interviews = await this.interviewService.getAllInterviews();
      res.status(200).json(interviews);
    } catch (error) {
      res.status(500).json({ message: 'Mülakatlar getirilirken bir hata oluştu', error });
    }
  }
}
