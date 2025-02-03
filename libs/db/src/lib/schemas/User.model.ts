import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '@libs/shared';

const UserSchema = new Schema<IUser>({
  document: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods['comparePassword'] = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this['password']);
};

export const User = model<IUser>('User', UserSchema);
export { UserSchema };
