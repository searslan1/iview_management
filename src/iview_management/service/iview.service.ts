import InterviewRepository from "../repository/iview.repository";
import { CreateInterviewDTO } from "../dto/iview.dto";

const interviewRepository = new InterviewRepository();

class InterviewService {
  interviewRepository: InterviewRepository;

  constructor() {
    this.interviewRepository = new InterviewRepository(); // InterviewRepository'yi burada doğru şekilde tanımlıyoruz
  }

  async createInterview(interviewData: CreateInterviewDTO) {
    const currentDate = new Date();
    const interviewDate = new Date(interviewData.date);

    // Mülakat tarihini kontrol ediyoruz
    let status = "live";  // Varsayılan olarak "live"
    if (interviewDate < currentDate) {
      status = "not live";  // Geçmiş bir tarihse "not live"
    }

    // Status alanını ekliyoruz
    const newInterviewData = {
      ...interviewData,
      status
    };

    return await this.interviewRepository.create(newInterviewData);
  }

  async getAllInterviews() {
    return await this.interviewRepository.getAllInterviews();
  }

  async getInterviewByLink(link: string) {
    return await this.interviewRepository.findByLink(link);
  }

  async getInterviewByUUID(uuid: string) {
    console.log("Service layer UUID:", uuid);
    return await this.interviewRepository.findByUUID(uuid);
  }

  async getInterviewById(id: string) {
    return await this.interviewRepository.getInterviewById(id); // interviewRepository'yi this üzerinden çağırıyoruz
  }

  async updateInterview(id: string, updateData: any) {
    return await this.interviewRepository.update(id, updateData);
  }

  async deleteInterview(id: string) {
    return await this.interviewRepository.delete(id);
  }
}

export default InterviewService;
