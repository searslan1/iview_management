import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

declare module 'express' {
  export interface Request {
    user?: JwtPayload & { role?: string };
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token alınıyor
  if (!token) {
    res.status(401).json({ message: 'Yetkisiz' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // `decoded` hem string hem de JwtPayload olabilir. Bu yüzden önce string olup olmadığını kontrol ediyoruz.
    if (typeof decoded === 'string') {
      res.status(403).json({ message: 'Geçersiz token formatı' });
      return;
    }

    req.user = decoded as JwtPayload & { role?: string }; // JWT'den gelen kullanıcı bilgisi istek üzerine ekleniyor
    next();
  } catch (error) {
    res.status(403).json({ message: 'Geçersiz token' });
  }
};

// Admin yetkisini kontrol eden middleware
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'master')) {
    res.status(403).json({ message: 'Yetkisiz işlem' });
    return;
  }
  next();
};

// Master yetkisini kontrol eden middleware
export const authorizeMaster = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'master') {
    res.status(403).json({ message: 'Yetkisiz işlem' });
    return;
  }
  next();
};
