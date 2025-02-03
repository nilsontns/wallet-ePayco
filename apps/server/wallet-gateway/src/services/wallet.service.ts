import { Config } from '../config/constants';
import axios from 'axios';

export class WalletService {
  static async rechargeWallet(
    token: string,
    document: string,
    phone: string,
    amount: number
  ) {
    if (!document) {
      throw new Error('El documento es requerido');
    }
    if (!phone) {
      throw new Error('El teléfono es requerido');
    }
    if (!amount) {
      throw new Error('El monto es requerido');
    }
    const response = await axios.post(
      `${Config.URL_API_DB}/recharge`,
      {
        document,
        phone,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  static async generatePurchaseCode(token: string, amount: number) {
    if (!amount) {
      throw new Error('El monto es requerido');
    }
    const response = await axios.post(
      `${Config.URL_API_DB}/generate-code`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  static async confirmCodePurchase(code: string, token: string) {
    if (!code) {
      throw new Error('El código es requerido');
    }
    const response = await axios.post(
      `${Config.URL_API_DB}/confirm-code`,
      {
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  static async getBalance(document: string, phone: string) {
    if (!document) {
      throw new Error('El documento es requerido');
    }
    if (!phone) {
      throw new Error('El teléfono es requerido');
    }
    const response = await axios.get(`${Config.URL_API_DB}/balance`, {
      params: {
        document,
        phone,
      },
    });
    return response.data;
  }

  static async getMyBalance(token: string) {
    const response = await axios.get(`${Config.URL_API_DB}/my-balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
