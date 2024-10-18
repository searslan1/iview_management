import CandidateRepository from "../repository/candidate.repository";
import { CreateCandidateDTO } from "../dto/candidate.dto";

const candidateRepository = new CandidateRepository();

class CandidateService {
  async createCandidate(candidateData: CreateCandidateDTO) {
    return await candidateRepository.create(candidateData);
  }

  async getCandidateById(id: string) {
    return await candidateRepository.findById(id);
  }

  async updateCandidate(id: string, updateData: any) {
    return await candidateRepository.update(id, updateData);
  }

  async deleteCandidate(id: string) {
    return await candidateRepository.delete(id);
  }

  async getCandidatesByInterviewId(interviewId: string) {
    return await candidateRepository.findByInterviewId(interviewId);
  }
}

export default CandidateService;
