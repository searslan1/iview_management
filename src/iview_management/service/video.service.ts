import { uploadVideoToS3 } from '../repository/s3Repository';
import { v4 as uuidv4 } from 'uuid'; // Benzersiz dosya adı için

export const uploadVideo = async (file: Express.Multer.File, formId: string): Promise<string> => {
    try {
        // Benzersiz dosya adını oluştur: formId_uuid.mp4
        const uniqueFileName = `${formId}_${uuidv4()}.mp4`;

        // Repository katmanına dosya ve benzersiz adı ilet
        const videoUrl = await uploadVideoToS3(file, uniqueFileName);
        return videoUrl; // Yüklenen dosyanın URL'sini döndür
    } catch (err) {
        throw new Error('Video yükleme hatası: ' + (err as Error).message);
    }
};
