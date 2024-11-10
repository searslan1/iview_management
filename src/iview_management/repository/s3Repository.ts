import s3 from '../service/aws.service';  // AWS S3 nesnesini içe aktar
import fs from 'fs';

export const uploadVideoToS3 = async (file: Express.Multer.File, uniqueFileName: string): Promise<string> => {
    const fileContent = fs.readFileSync(file.path); // Dosya içeriklerini oku

    // S3'ye yükleme parametreleri
    const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: `videos/${uniqueFileName}`, // Benzersiz dosya adı burada kullanılıyor
        Body: fileContent,
        ContentType: file.mimetype,
    };

    try {
        const data = await s3.upload(params).promise(); // S3'ye yükle
        return data.Location; // Yüklenen dosyanın URL'sini döndür
    } catch (err) {
        throw new Error('S3\'ye yükleme hatası: ' + (err as Error).message);
    }
};

export const getPresignedUrlRepository = async (videoKey: string): Promise<string> => {
    // Presigned URL oluşturma parametreleri
    const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key: `videos/${videoKey}`, // Dosya adı veya yolu
        Expires: 3600,  // URL geçerlilik süresi (1 saat)
    };

    try {
        // S3'ten presigned URL oluştur
        const presignedUrl = s3.getSignedUrl('getObject', params);
        return presignedUrl;
    } catch (err) {
        throw new Error('Presigned URL oluşturulamadı: ' + (err as Error).message);
    }
};
