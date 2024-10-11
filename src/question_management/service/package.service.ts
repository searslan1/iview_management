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
    const { questionText, packageName } = relationData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionText || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    // Paket-soru ilişkisi oluşturma
    return await this.PackageRepository.addRelation(questionText, packageName);
  }

  // Belirli bir pakete ait ilişkili soruları getir
  public async getQuestionsByPackage(packageName: string): Promise<string[]> {
    if (!packageName) {
      throw new Error('Paket adı gereklidir.');
    }

    return await this.PackageRepository.getQuestionTextsByPackage(packageName);
  }


// Paket-soru ilişkisini ve süresini güncelleme
public async updateRelation(updateData: UpdateRelationDto): Promise<IQuestionPackageRelation | null> {
  const { questionText, newQuestionText, newDuration } = updateData;

  // İş mantığı: Gerekli alanlar kontrolü
  if (!questionText || (newQuestionText === undefined && newDuration === undefined)) {
    throw new Error('Geçerli bir Soru ID ve güncellenmiş veri gereklidir.');
  }

  // Güncellemeyi gerçekleştir
  return await this.PackageRepository.updateRelation(questionText, newQuestionText, newDuration);
}


  // Paket-soru ilişkisini silme
  public async deleteRelation(deleteData: DeleteRelationDto): Promise<IQuestionPackageRelation | null> {
    const { questionText, packageName } = deleteData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionText || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    return await this.PackageRepository.deleteRelation(questionText, packageName);
  }
  public async searchQuestionsByTag(tag: string): Promise<IQuestion[]> {
    return await Question.find({ tags: tag });
  }
  
}

