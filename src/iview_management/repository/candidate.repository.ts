import {Candidate} from "../models/candidate.schema";

class CandidateRepository {
  async create(candidateData: any) {
    const candidate = new Candidate(candidateData);
    return await candidate.save();
  }

  async findById(id: string) {
    return await Candidate.findById(id);
  }

  async findAll() {
    return await Candidate.find();
  }

  async update(id: string, updateData: any) {
    return await Candidate.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Candidate.findByIdAndDelete(id);
  }

  async findByInterviewId(interviewId: string) {
    return await Candidate.find({ interviewId });
  }
  // Belirli bir mülakat ID'sine göre toplam aday sayısını bul
  async countCandidatesByInterviewId(interviewId: string) {
    return await Candidate.countDocuments({ interview: interviewId });
  }

  // Belirli bir mülakat ID'sine göre pending durumda olan adayların sayısını bul
  async countPendingCandidatesByInterviewId(interviewId: string) {
    return await Candidate.countDocuments({ interview: interviewId, status: "pending" });
  }
}

export default CandidateRepository;
