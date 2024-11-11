import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db";
import commonRouter from "./common/router/auth.routes";
import questionRouter from "./question_management/routes/question.routes";
import registerRoutes from "./common/router/register.routes";
import iviewRoutes from "./iview_management/routes/iview.routes";
import candidateRoutes from "./iview_management/routes/candidate.routes";
import videoRoutes from "./iview_management/routes/video.routes";

dotenv.config(); // .env dosyasını yükle

// CORS ayarları için tanımlı environment değişkenlerini kontrol ediyoruz
const corsOrigins = [process.env.CORS_ORIGIN, process.env.CORS_USER].filter(
  (origin): origin is string => !!origin
);

const app = express();

connectDB();

// JSON body parser kullan
app.use(express.json());
app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : false, // Eğer tanımlı değilse CORS'u devre dışı bırak
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Router ayarları
app.use("/api/register", registerRoutes); // admin kaydı için
app.use("/api/auth", commonRouter); // Auth işlemleri için
app.use("/api/questions", questionRouter); // Soru yönetimi için
app.use("/api/iview", iviewRoutes);
app.use("/api/candidate", candidateRoutes);
app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
