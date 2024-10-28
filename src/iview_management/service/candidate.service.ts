import CandidateRepository from "../repository/candidate.repository";
import { CreateCandidateDTO } from "../dto/candidate.dto";
import { Candidate } from "../models/candidate.schema";

const candidateRepository = new CandidateRepository();

class CandidateService {
  async createCandidate(candidateData: CreateCandidateDTO) {
    return await candidateRepository.create(candidateData);
  }

  async getCandidateByInterviewId(interviewId: string) {
    return await Candidate.find({ interview: interviewId }, 'name surname videoUrl'); 
  }

  async updateCandidate(id: string, updateData: any) {
    return await candidateRepository.update(id, updateData);
  }

  async deleteCandidate(id: string) {
    return await candidateRepository.delete(id);
  }

  async getCandidatesByInterviewId(interviewId: string) {
    return await Candidate.find({ interview: interviewId }).populate('interview'); // Interview ile ilişkili adayları getir
  }
  async getCandidateById(id: string) {
    return await candidateRepository.findById(id);
  }
  // Mülakat ID'sine göre toplam aday sayısı
  async getTotalCandidatesByInterviewId(interviewId: string) {
    return await candidateRepository.countCandidatesByInterviewId(interviewId);
  }

  // Mülakat ID'sine göre pending durumda olan aday sayısı
  async getPendingCandidatesByInterviewId(interviewId: string) {
    return await candidateRepository.countPendingCandidatesByInterviewId(interviewId);
  }
}

export default CandidateService;
