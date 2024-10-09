import { QuestionPackageRelation, IQuestionPackageRelation } from '../entity/package';

export class QuestionPackageRepository {
  static deleteRelation(questionId: string, packageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation | null> | null {
      throw new Error('Method not implemented.');
  }
  static updateRelation(questionId: string, newPackageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation | null> | null {
      throw new Error('Method not implemented.');
  }
  static getQuestionIdsByPackage(packageName: string): string[] | PromiseLike<string[]> {
      throw new Error('Method not implemented.');
  }

  static addRelation(questionId: string, packageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation> {
      throw new Error('Method not implemented.');
  }
  // Yeni bir paket-soru ilişkisi ekleme
  public async addRelation(questionId: string, packageName: string): Promise<IQuestionPackageRelation> {
    const newRelation = new QuestionPackageRelation({ questionId, packageName });
    return await newRelation.save();
  }

  // Belirli bir pakete ait ilişkileri bulma
  public async findRelationsByPackage(packageName: string): Promise<IQuestionPackageRelation[]> {
    return await QuestionPackageRelation.find({ packageName });
  }

  // İlişkili soruların ID'lerini çekme
  public async getQuestionIdsByPackage(packageName: string): Promise<string[]> {
    const relations = await this.findRelationsByPackage(packageName);
    return relations.map(relation => relation.questionId);
  }

  // Paket-soru ilişkisini güncelleme
  public async updateRelation(questionId: string, newPackageName: string): Promise<IQuestionPackageRelation | null> {
    const relation = await QuestionPackageRelation.findOne({ questionId });
    if (relation) {
      relation.packageName = newPackageName;
      await relation.save();
    }
    return relation;
  }

  // Paket-soru ilişkisini silme
  public async deleteRelation(questionId: string, packageName: string): Promise<IQuestionPackageRelation | null> {
    return await QuestionPackageRelation.findOneAndDelete({ questionId, packageName });
  }
}

