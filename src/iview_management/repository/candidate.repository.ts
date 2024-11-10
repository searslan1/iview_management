import { Candidate } from "../models/candidate.schema";
import { getPresignedUrlRepository } from './s3Repository';
import { CreateCandidateDTO } from "../dto/candidate.dto"; // DTO'yu içe aktarın

class CandidateRepository {
  async create(candidateData: CreateCandidateDTO) {
    const candidate = new Candidate(candidateData);
    return await candidate.save();
  }

  async findById(id: string) {
    return await Candidate.findById(id);
  }

  async findAll() {
    return await Candidate.find();
  }

  async update(id: string, updateData: Partial<CreateCandidateDTO>) {
    return await Candidate.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Candidate.findByIdAndDelete(id);
  }

  async findByInterviewId(interviewId: string) {
    return await Candidate.find({ interview: interviewId });
  }

  async getPresignedUrlsForCandidates(candidates: InstanceType<typeof Candidate>[]) {
    return await Promise.all(
      candidates.map(async (candidate) => {
        const presignedUrl = candidate.videoUrl
          ? await getPresignedUrlRepository(candidate.videoUrl)
          : null; // videoUrl yoksa null olarak döndür

        return {
          ...candidate.toObject(),
          videoUrl: presignedUrl,
        };
      })
    );
}



  async countCandidatesByInterviewId(interviewId: string) {
    return await Candidate.countDocuments({ interview: interviewId });
  }

  async countPendingCandidatesByInterviewId(interviewId: string) {
    return await Candidate.countDocuments({ interview: interviewId, status: "pending" });
  }
}

export default CandidateRepository;
