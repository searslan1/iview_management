import { IQuestion, Question } from "../entity/question";
import {
  QuestionPackageRelation,
  IQuestionPackageRelation,
} from "../entity/package";

export class PackageRepository {
  // Yeni bir paket-soru ilişkisi ekleme
  public async addRelation(
    questionText: string,
    packageName: string
  ): Promise<IQuestionPackageRelation> {
    const newRelation = new QuestionPackageRelation({
      questionText,
      packageName,
    });
    return await newRelation.save();
  }

  // Belirli bir pakete ait ilişkileri bulma
  public async findRelationsByPackage(
    packageName: string
  ): Promise<IQuestionPackageRelation[]> {
    return await QuestionPackageRelation.find({ packageName });
  }

  // İlişkili soruların ID'lerini çekme
  public async getQuestionTextsByPackage(
    packageName: string
  ): Promise<string[]> {
    const relations = await this.findRelationsByPackage(packageName); // Paket-soru ilişkilerini buluyoruz
    console.log("Relations:", relations);
    return relations.map((relation) => relation.questionText); // İlişkili soru metinlerini döndürüyoruz
  }

  // Paket-soru ilişkisini güncelleme
  public async updateQuestion(
    questionID: string, // questionID ile arama yapacağız
    newQuestionText?: string,
    newDuration?: number
  ): Promise<IQuestion | null> {
    // Soru ID'sine göre güncelleme yap
    const question = await Question.findById(questionID); // questionID ile güncelleme yapıyoruz

    if (!question) {
      throw new Error("Soru bulunamadı");
    }

    // Eğer yeni questionText varsa, güncelle
    if (newQuestionText !== undefined) {
      question.questionText = newQuestionText;
    }

    // Eğer yeni duration varsa, güncelle
    if (newDuration !== undefined) {
      question.duration = newDuration;
    }

    await question.save();

    return question;
  }

  // Paket-soru ilişkisini silme
  public async deleteRelation(
    questionText: string,
    packageName: string
  ): Promise<IQuestionPackageRelation | null> {
    return await QuestionPackageRelation.findOneAndDelete({
      questionText,
      packageName,
    });
  }

  // Paket isimlerini çekme
  public async getPackageNames(): Promise<string[]> {
    // Question modelinden unique tags alanlarını çekiyoruz
    const packageNames = await Question.distinct("tags");
    return packageNames;
  }
  // Pakete ait ilişkili tüm soruları tam detaylarıyla getiren fonksiyon
  public async getQuestionsByPackage(
    packageName: string
  ): Promise<IQuestion[]> {
    // İlgili paket ismiyle ilişkili soru ilişkilerini çekiyoruz
    const relations = await QuestionPackageRelation.find({ packageName });

    // İlişkili her soru için detaylarını çekiyoruz
    const questions = await Promise.all(
      relations.map(async (relation) => {
        // Veritabanında sorunun tamamını çekiyoruz (questionText, duration, tags, vb.)
        return await Question.findOne({ questionText: relation.questionText });
      })
    );

    // Null olan sonuçları filtreleyerek sadece geçerli soru nesnelerini döndürüyoruz
    return questions.filter(
      (question): question is IQuestion => question !== null
    );
  }
}
