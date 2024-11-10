import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Çevre değişkenlerini yükle
dotenv.config();

// AWS SDK'yı yapılandırma
AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

// S3 nesnesini oluştur ve dışa aktar
const s3 = new AWS.S3();

export default s3;
