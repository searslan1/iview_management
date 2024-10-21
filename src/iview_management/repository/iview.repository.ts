import {Interview }from "../models/iview.schema";
import { v4 as uuidv4 } from 'uuid';

class InterviewRepository {
  async create(interviewData: any) {
    const interviewLink = uuidv4(); // UUID ile benzersiz link oluşturuluyor
    interviewData.link = `http://localhost:5174/interview/${interviewLink}`; // Benzersiz link ekleniyor
    const interview = new Interview(interviewData);
    return await interview.save();
}

  async findByLink(link: string) {
    return await Interview.findOne({ link });
  }

  async findAll() {
    return await Interview.find().populate("candidates");
  }

  async update(id: string, updateData: any) {
    return await Interview.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await Interview.findByIdAndDelete(id);
  }
  async getInterviewById(id: string) {
    // Interview'ı bul ve soruların text ve duration alanlarını getir
    return await Interview.findById(id).populate('questions', 'questionText duration');
  }
}

export default InterviewRepository;
function generateUniqueLink() {
  throw new Error("Function not implemented.");
}

