import express from 'express';
import { connectDB } from './db/db';
import commonRouter from './common/router/auth.routes';
import questionRouter from './question_management/routes/question.routes';
import registerRoutes from './common/router/register.routes';

const app = express();
const cors = require('cors');
// Veritabanı bağlantısını başlat
connectDB();

// JSON body parser kullan
app.use(express.json());
app.use(cors());

// Route'ları kullan
// Register rotalarını kullan
app.use('/api/register', registerRoutes);
app.use('/api/auth', commonRouter); // Auth işlemleri için
app.use('/api/questions', questionRouter); // Soru yönetimi için

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
