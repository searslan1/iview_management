import { UserRepository } from '../repository/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class AuthService {
  private userRepository = new UserRepository();

  // JWT token üretme
  public generateToken(payload: { username: string; role: string }): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // 1 saat geçerli bir token
  }

  // Kullanıcı giriş doğrulama
  public async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return false;  // Kullanıcı bulunamazsa false döner
    }

    // Parolayı doğrula
    return await bcrypt.compare(password, user.password);
  }

  // Kullanıcı giriş işlemi
  public async login(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;  // Kullanıcı bulunamazsa veya şifre yanlışsa null döner
    }

    // Kullanıcı doğruysa JWT token üret
    return this.generateToken({ username: user.username, role: user.role });
  }

  // Admin yetkisi verme
  public async grantAdminRole(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }
  
    user.role = 'admin';
    await this.userRepository.updateUser(user);
  }
}