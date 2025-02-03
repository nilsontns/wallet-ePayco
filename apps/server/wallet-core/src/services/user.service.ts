import { IUser } from '@libs/shared';
import { User, Wallet } from '@libs/db';
import { Jwt  } from '../utils/jwt';


export class UserService {
  static async register(userData: IUser): Promise<any> {
    try {

      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }
      const user = new User(userData);
      await user.save();
      const newWallet = new Wallet({ userId: user._id, balance: 0 });
      await newWallet.save();
      Jwt.createToken(user);
      return { message: 'Usuario registrado correctamente', user, wallet: newWallet };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login(email: string, password: string): Promise<any> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Contraseña incorrecta');
      }
      const token = await Jwt.createToken(user);
      if(!token) throw new Error('Error al generar el token');
      return { user, token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByJwtVerify(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  
}
