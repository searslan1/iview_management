import InterviewRepository from "../repository/iview.repository";
import { CreateInterviewDTO } from "../dto/iview.dto";

const interviewRepository = new InterviewRepository();

class InterviewService {
  interviewRepository: any;
  async createInterview(interviewData: CreateInterviewDTO) {
    return await interviewRepository.create(interviewData);
  }
  async getAllInterviews() {
    return await interviewRepository.getAllInterviews(); // repository'deki fonksiyon çağrılır
  }

  async getInterviewByLink(link: string) {
    return await interviewRepository.findByLink(link);
  }
  
  async getInterviewById(id: string) {
    return await this.interviewRepository.getInterviewById(id);
  }
 
  async updateInterview(id: string, updateData: any) {
    return await interviewRepository.update(id, updateData);
  }

  async deleteInterview(id: string) {
    return await interviewRepository.delete(id);
  }
}

export default InterviewService;
