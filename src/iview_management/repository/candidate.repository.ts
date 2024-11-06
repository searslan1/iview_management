import { Candidate } from "../models/candidate.schema";
import { getPresignedUrlRepository } from './s3Repository';  // S3 Presigned URL fonksiyonunu içe aktar

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
    return await Candidate.find({ interview: interviewId }); // Tüm aday bilgilerini seçiyoruz
  }

  async getPresignedUrlsForCandidates(candidates: any[]) {
    return await Promise.all(
      candidates.map(async (candidate) => {
        const presignedUrl = await getPresignedUrlRepository(candidate.videoUrl);
        return {
          ...candidate.toObject(), // Tüm aday bilgilerini döndürüyoruz
          videoUrl: presignedUrl,  // Presigned URL'i video anahtarı yerine koyuyoruz
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
