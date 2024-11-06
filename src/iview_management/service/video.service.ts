import s3 from '../service/aws.service';
import fs from 'fs';
import { getPresignedUrlRepository } from '../repository/s3Repository';
export const uploadVideo = async (file: Express.Multer.File, formId: string): Promise<string> => {
    const fileContent = fs.readFileSync(file.path); // Dosya içeriklerini oku

    // Benzersiz dosya adı oluşturma (formId ile birlikte)
    const uniqueFileName = `${formId}_${Date.now()}_${file.originalname}`;

    // S3'ye yükleme parametreleri
    const params = {
        Bucket: process.env.BUCKET_NAME!,  // S3 Bucket adını kontrol edin
        Key: `videos/${uniqueFileName}`,   // Benzersiz dosya adı
        Body: fileContent,
        ContentType: file.mimetype
    };

    try {
        // S3'e dosya yükleme
        await s3.upload(params).promise();  // Sadece yükleme yapılır, dönen değeri kontrol etmiyoruz
        return uniqueFileName;  // Dosya adını döndürürüz
    } catch (err) {
        throw new Error('S3\'ye yükleme hatası: ' + (err as Error).message);
    }
    
};
export const getPresignedVideoUrlService = async (videoKey: string): Promise<string> => {
    return await getPresignedUrlRepository(videoKey);
};