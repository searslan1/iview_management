import { User, IUser } from '../models/user.schema';

export class UserRepository {
    // Veritabanından kullanıcıyı bul
    public async findByUsername(username: string): Promise<IUser | null> {
      return await User.findOne({ username });
    }
  
    // Kullanıcıyı güncelle
    public async updateUser(user: IUser): Promise<void> {
      await user.save();
    }
  }