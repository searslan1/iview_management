import { Router } from 'express';
import { authController } from '../controller/auth.controller'; // Doğrudan authController örneği kullanılıyor
import { authenticate, authorizeAdmin, authorizeMaster } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // Maksimum 5 deneme hakkı
  message: 'Çok fazla giriş denemesi yapıldı. Lütfen daha sonra tekrar deneyin.'
});

// Admin rolü verme route'u (Sadece master yetkisi gerektirir)
router.post('/grant-admin', authenticate, authorizeMaster, authController.grantAdminRole.bind(authController));

// Admin giriş route'u (JWT token üretir)
router.post('/login', loginLimiter, authController.login.bind(authController));

// Sadece admin yetkisi gerektiren bir route
router.post('/admin-data', authenticate, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin yetkisi ile erişildi.' });
});

// Sadece master yetkisi gerektiren bir route
router.get('/master-data', authenticate, authorizeMaster, (req, res) => {
  res.status(200).json({ message: 'Master yetkisi ile erişildi.' });
});

export default router;