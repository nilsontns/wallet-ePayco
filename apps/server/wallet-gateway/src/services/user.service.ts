import { IUser } from '@libs/shared';
import { Config } from '../config/constants';
import axios from 'axios';

export class UserService {
  static async register(userData: IUser): Promise<any> {
    const { email, password, name, phone, document } = userData;
    if (!email || !password || !name || !phone || !document) {
      throw new Error('Todos los campos son requeridos');
    }
    const response = await axios.post(`${Config.URL_API_DB}/user`, {
      email,
      password,
      name,
      phone,
      document,
    });
    return response.data;
  }

  static async login(email: string, password: string): Promise<any> {
    
      if(!email) {
        throw new Error('El email es requerido');
      }
      if(!password) {
        throw new Error('La contraseña es requerida');
      }
      const response = await axios.post(`${Config.URL_API_DB}/login`, {
        email,
        password,
      });
      return response.data;
  }
}
