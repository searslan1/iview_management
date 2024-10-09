import { IQuestionPackageRelation } from '../entity/package';
import {QuestionPackageRepository} from '../repository/package.repository';
import { AddRelationDto, UpdateRelationDto, DeleteRelationDto } from '../dto/package.dto';

export class QuestionPackageService {
  private questionPackageRepository: typeof QuestionPackageRepository;

  constructor() {
    this.questionPackageRepository = QuestionPackageRepository;
  }

  // Yeni bir paket-soru ilişkisi oluştur
  public async addRelation(relationData: AddRelationDto): Promise<IQuestionPackageRelation> {
    const { questionId, packageName } = relationData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionId || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    // Paket-soru ilişkisi oluşturma
    return await this.questionPackageRepository.addRelation(questionId, packageName);
  }

  // Belirli bir pakete ait ilişkili soruları getir
  public async getQuestionsByPackage(packageName: string): Promise<string[]> {
    if (!packageName) {
      throw new Error('Paket adı gereklidir.');
    }

    return await this.questionPackageRepository.getQuestionIdsByPackage(packageName);
  }

  // Paket-soru ilişkisini güncelleme
  public async updateRelation(updateData: UpdateRelationDto): Promise<IQuestionPackageRelation | null> {
    const { questionId, newPackageName } = updateData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionId || !newPackageName) {
      throw new Error('Soru ID ve yeni paket adı gereklidir.');
    }

    return await this.questionPackageRepository.updateRelation(questionId, newPackageName);
  }

  // Paket-soru ilişkisini silme
  public async deleteRelation(deleteData: DeleteRelationDto): Promise<IQuestionPackageRelation | null> {
    const { questionId, packageName } = deleteData;

    // İş mantığı: Gerekli alanlar kontrolü
    if (!questionId || !packageName) {
      throw new Error('Soru ID ve paket adı gereklidir.');
    }

    return await this.questionPackageRepository.deleteRelation(questionId, packageName);
  }
}

