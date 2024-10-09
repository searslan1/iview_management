import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.schema';
import { config } from '../config/config';
import { Request, Response } from 'express';
import { LoginDTO } from '../dto/auth.dto';

export class AuthController {
  // Kullanıcıyı doğrulayıp token döndürme
  public async login(req: Request, res: Response): Promise<void> {
    const { username, password }: LoginDTO = req.body; // LoginDTO türünü kullanarak req.body'den değer alıyoruz

    try {
      // Veritabanından kullanıcıyı bul
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        return;
      }
      console.log('User found:', user);
      
      

      // Parolayı doğrula
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isPasswordValid);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
        return;
      }

      // Token oluştur ve döndür
      const token = this.generateToken({ username, role: user.role });
      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ message: 'Sunucu hatası', error });
    }
  }

  // Token oluşturma fonksiyonu
  public generateToken(payload: object): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
  }

  // Admin rolü verme fonksiyonu
  public async grantAdminRole(req: Request, res: Response): Promise<void> {
    const { username } = req.body;
    try {
      await User.updateOne({ username }, { role: 'admin' });
      res.status(200).json({ message: 'Admin yetkisi başarıyla verildi.' });
    } catch (error) {
      res.status(500).json({ message: 'Yetki verme sırasında bir hata oluştu.', error });
    }
  }
}

// `AuthController` sınıfının bir örneğini oluşturun
export const authController = new AuthController();
