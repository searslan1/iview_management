import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'master';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'master'] }
});

export const User = model<IUser>('User', UserSchema);

