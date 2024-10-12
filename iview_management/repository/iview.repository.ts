import { Interview, IInterview } from '../models/iview.schema';

export class InterviewRepository {
    public async createInterview(interviewData: Partial<IInterview>): Promise<IInterview> {
      const newInterview = new Interview(interviewData);
      return await newInterview.save();
    }
  
    public async getAllInterviews(): Promise<IInterview[]> {
      return await Interview.find();
    }
  }