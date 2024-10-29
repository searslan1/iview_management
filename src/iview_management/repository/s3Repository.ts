import s3 from '../service/aws.service';
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
