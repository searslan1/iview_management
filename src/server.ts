import express from "express";
import { connectDB } from "./db/db";
import commonRouter from "./common/router/auth.routes";
import questionRouter from "./question_management/routes/question.routes";
import registerRoutes from "./common/router/register.routes";
import packageRouter from "./question_management/routes/package.routes";

const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
const cors = require("cors");

connectDB();

// JSON body parser kullan
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/register", registerRoutes); //admin kaydı için
app.use("/api/auth", commonRouter); // Auth işlemleri için
app.use("/api/questions", questionRouter); // Soru yönetimi için
app.use("/api/packages", packageRouter); //paket yönetimi için

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
