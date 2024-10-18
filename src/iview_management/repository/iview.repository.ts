import {Interview }from "../models/iview.schema";

class InterviewRepository {
  async create(interviewData: any) {
    const interview = new Interview(interviewData);
    return await interview.save();
  }

  async findById(id: string) {
    return await Interview.findById(id).populate("candidates");
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
}

export default InterviewRepository;
