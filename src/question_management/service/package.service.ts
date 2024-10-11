import { IQuestionPackageRelation } from '../entity/package';
import {PackageRepository} from '../repository/package.repository';
import { AddRelationDto, UpdateRelationDto, DeleteRelationDto } from '../dto/package.dto';
import { IQuestion, Question } from '../entity/question'; // Question ve IQuestion'ı doğru yerden içe aktarın


export class PackageService {
  private PackageRepository: PackageRepository;

  constructor() {
    this.PackageRepository = new PackageRepository();
  }

  // Yeni bir paket-soru ilişkisi oluştur
  public async addRelation(relationData: AddRelationDto): Promise<IQuestionPackageRelation> {
    const { questionId, packageName } = relationData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionId || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    // Paket-soru ilişkisi oluşturma
    return await this.PackageRepository.addRelation(questionId, packageName);
  }

  // Belirli bir pakete ait ilişkili soruları getir
  public async getQuestionsByPackage(packageName: string): Promise<string[]> {
    if (!packageName) {
      throw new Error('Paket adı gereklidir.');
    }

    return await this.PackageRepository.getQuestionIdsByPackage(packageName);
  }


// Paket-soru ilişkisini ve süresini güncelleme
public async updateRelation(updateData: UpdateRelationDto): Promise<IQuestionPackageRelation | null> {
  const { questionId, newQuestionId, newDuration } = updateData;

  // İş mantığı: Gerekli alanlar kontrolü
  if (!questionId || (newQuestionId === undefined && newDuration === undefined)) {
    throw new Error('Geçerli bir Soru ID ve güncellenmiş veri gereklidir.');
  }

  // Güncellemeyi gerçekleştir
  return await this.PackageRepository.updateRelation(questionId, newQuestionId, newDuration);
}


  // Paket-soru ilişkisini silme
  public async deleteRelation(deleteData: DeleteRelationDto): Promise<IQuestionPackageRelation | null> {
    const { questionId, packageName } = deleteData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionId || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    return await this.PackageRepository.deleteRelation(questionId, packageName);
  }
  public async searchQuestionsByTag(tag: string): Promise<IQuestion[]> {
    return await Question.find({ tags: tag });
  }
  
}

