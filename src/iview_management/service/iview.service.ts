import { InterviewRepository } from '../repository/iview.repository';
import { IInterviewDTO } from '../dto/iview.dto';
import { IInterview } from '../models/iview.schema';

export class InterviewService {
  private interviewRepository: InterviewRepository;

  constructor() {
    this.interviewRepository = new InterviewRepository();
  }

  public async createInterview(interviewData: IInterviewDTO): Promise<IInterview> {
    // interviewData'yı doğrudan IInterview türüne map edin
    const interviewToCreate: Partial<IInterview> = {
      ...interviewData,
      totalVideos: 0, // Varsayılan değer
      pendingVideos: 0 // Varsayılan değer
    };
    return await this.interviewRepository.createInterview(interviewToCreate);
  }

  public async getAllInterviews() {
    return await this.interviewRepository.getAllInterviews();
  }
}
