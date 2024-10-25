import CandidateRepository from "../repository/candidate.repository";
import { CreateCandidateDTO } from "../dto/candidate.dto";
import { Candidate } from "../models/candidate.schema";

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
    return await Candidate.find({ interview: interviewId }).populate('interview'); // Interview ile ilişkili adayları getir
  }
}

export default CandidateService;
