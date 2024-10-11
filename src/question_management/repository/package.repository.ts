import { QuestionPackageRelation, IQuestionPackageRelation } from '../entity/package';

export class PackageRepository {
  static deleteRelation(questionText: string, packageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation | null> | null {
      throw new Error('Method not implemented.');
  }
  static updateRelation(questionText: string, newPackageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation | null> | null {
      throw new Error('Method not implemented.');
  }
  static getQuestionTextsByPackage(packageName: string): string[] | PromiseLike<string[]> {
      throw new Error('Method not implemented.');
  }

  static addRelation(questionText: string, packageName: string): IQuestionPackageRelation | PromiseLike<IQuestionPackageRelation> {
      throw new Error('Method not implemented.');
  }
  // Yeni bir paket-soru ilişkisi ekleme
  public async addRelation(questionText: string, packageName: string): Promise<IQuestionPackageRelation> {
    const newRelation = new QuestionPackageRelation({ questionText, packageName });
    return await newRelation.save();
  }

  // Belirli bir pakete ait ilişkileri bulma
  public async findRelationsByPackage(packageName: string): Promise<IQuestionPackageRelation[]> {
    return await QuestionPackageRelation.find({ packageName });
  }

  // İlişkili soruların ID'lerini çekme
  public async getQuestionTextsByPackage(packageName: string): Promise<string[]> {
    const relations = await this.findRelationsByPackage(packageName);
    return relations.map(relation => relation.questionText);
  }

 // Paket-soru ilişkisini güncelleme
public async updateRelation(questionText: string, newQuestionText?: string, newDuration?: number): Promise<IQuestionPackageRelation | null> {
  const relation = await QuestionPackageRelation.findOne({ questionText });
  
  if (relation) {
    // Eğer yeni questionText varsa, güncelle
    if (newQuestionText !== undefined) {
      relation.questionText = newQuestionText;
    }
    
    // Eğer yeni duration varsa, güncelle
    if (newDuration !== undefined) {
      (relation as any).duration = newDuration; // duration alanı QuestionPackageRelation şemasında tanımlı değilse "any" türünde dönüşüm yapılabilir
    }
    
    await relation.save();
  }

  return relation;
}


  // Paket-soru ilişkisini silme
  public async deleteRelation(questionText: string, packageName: string): Promise<IQuestionPackageRelation | null> {
    return await QuestionPackageRelation.findOneAndDelete({ questionText, packageName });
  }
}

