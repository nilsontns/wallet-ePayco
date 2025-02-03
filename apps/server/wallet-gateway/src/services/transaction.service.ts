import axios from 'axios';
import { Config } from '../config/constants';

export class TransactionService {
  static async getBalance(token: string) {
    try {
      const response = await axios.get(`${Config.URL_API_DB}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
