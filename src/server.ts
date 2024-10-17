import express from "express";
import dotenv from "dotenv"; // dotenv'i içe aktar
import { connectDB } from "./db/db";
import commonRouter from "./common/router/auth.routes";
import questionRouter from "./question_management/routes/question.routes";
import registerRoutes from "./common/router/register.routes";

dotenv.config(); // .env dosyasını yükle

const CORS_ORIGIN1 = process.env.CORS_ORIGIN;
const CORS_USER = process.env.CORS_USER;

const app = express();
const cors = require("cors");

connectDB();

// JSON body parser kullan
app.use(express.json());
app.use(
  cors({
    origin: [CORS_ORIGIN1, CORS_USER],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Kullanıcı kaydı için
app.use("/api/register", registerRoutes); //admin kaydı için
app.use("/api/auth", commonRouter); // Auth işlemleri için
app.use("/api/questions", questionRouter); // Soru yönetimi için

const PORT = process.env.PORT; // Eğer PORT yoksa varsayılan 5000
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
