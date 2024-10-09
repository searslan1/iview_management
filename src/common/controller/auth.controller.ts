import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { config } from '../config/config';
import { LoginDTO } from '../dto/auth.dto';

const authService = new AuthService();

export const grantAdmin = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    // Admin yetkisini vermek için service katmanını çağırıyoruz
    await authService.grantAdminRole(username);
    res.status(200).json({ message: 'Admin yetkisi başarıyla verildi.' });
  } catch (error) {
    res.status(500).json({ message: 'Yetki verme sırasında bir hata oluştu.', error });
  }
};

// Admin Girişi
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password }: LoginDTO = req.body;

     // Eğer giriş verileri eksikse hata döndür
     if (!username || !password) {
      res.status(400).json({ message: 'Kullanıcı adı ve şifre gerekli' });
      return;
    }

    // Eğer master giriş yapıyorsa, .env'deki bilgileri kontrol et
    if (username === config.masterUsername && password === config.masterPassword) {
      const masterToken = authService.generateToken({ username, role: 'master' });
      res.status(200).json({ token: masterToken });
      return;
    }

    // Eğer admin ise, veritabanında kontrol et
    const token = await authService.login(username, password);
    if (!token) {
      res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
      return;
    }

    // Başarılı girişte token döndür
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
