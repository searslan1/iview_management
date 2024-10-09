import { Router } from 'express';
import { loginAdmin } from '../controller/auth.controller';
import { authenticate, authorizeAdmin, authorizeMaster } from '../middleware/auth.middleware';
import { UserRepository } from '../repository/user.repository'; 

const router = Router();
const userRepository = new UserRepository();


router.post('/grant-admin', authenticate, authorizeMaster, async(req, res) => {
  res.status(200).json({ message: 'Admin yetkisi verildi.' });
})
// Admin giriş route'u (JWT token üretir)
router.post('/login', loginAdmin);

// Sadece admin yetkisi gerektiren bir route
router.get('/admin-data', authenticate, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin yetkisi ile erişildi.' });
});

// Sadece master yetkisi gerektiren bir route
router.get('/master-data', authenticate, authorizeMaster, (req, res) => {
  res.status(200).json({ message: 'Master yetkisi ile erişildi.' });
});

export default router;
