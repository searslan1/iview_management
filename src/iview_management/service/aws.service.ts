// AWS S3 yükleme fonksiyonu
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

export const uploadVideo = async (file: { originalname: any; buffer: any; mimetype: any; }) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // S3 bucket adı
    Key: `videos/${Date.now()}-${file.originalname}`,  // Benzersiz bir isim oluşturuyoruz
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;  // Video URL'sini döndürüyoruz
};
