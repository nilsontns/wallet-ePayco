import { Document } from 'mongoose';

export interface IUser extends Document {
  document: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
