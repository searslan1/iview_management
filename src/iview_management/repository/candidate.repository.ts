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
}

export default CandidateRepository;
