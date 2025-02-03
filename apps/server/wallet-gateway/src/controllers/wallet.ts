import { Express, Request, Response } from 'express';
import { WalletService } from '../services';
import { checkJwt } from '../utils/checkJwt';

export class WalletControllerClass {
  public rechargeWallet = async (req: Request, res: Response) => {
    try {
      const { token }: any = req;
      if (!token) {
        throw new Error('Acceso denegado');
      }
      const { document, phone, amount } = req.body;
      const result = await WalletService.rechargeWallet(
        token,
        document,
        phone,
        amount
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.response.data.error });
    }
  };

  public generatePurchaseCode = async (req: Request, res: Response) => {
    try {
      const { token }: any = req;
      const { amount } = req.body;
      const result = await WalletService.generatePurchaseCode(token, amount);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.response.data.error });
    }
  };

  public getBalance = async (req: Request, res: Response) => {
    try {
      const { token }: any = req;
      if (!token) {
        throw new Error('Acceso denegado');
      }
      const { documento, celular } = req.query;
      const result = await WalletService.getBalance(
        documento as string,
        celular as string
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public getMyBalance = async (req: Request, res: Response) => {
    try {
      const { token }: any = req;
      const result = await WalletService.getMyBalance(token);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: 'error' });
    }
  };

  public confirmCodePurchase = async (req: Request, res: Response) => {
    try {
      const { token }: any = req;
      const { code } = req.body;
      const result = await WalletService.confirmCodePurchase(code, token);
      res.status(200).json(result);
    } catch (error) {
      console.log("🚀 ~ WalletControllerClass ~ confirmCodePurchase= ~ error:", error)
      res.status(400).json({ error: error.response.data.error });
    }
  };

  setRoutes(expressApp: Express, baseRoute?: string): void {
    expressApp.post(`${baseRoute}/recharge`, checkJwt, this.rechargeWallet);
    expressApp.post(
      `${baseRoute}/purchase`,
      checkJwt,
      this.generatePurchaseCode
    );
    expressApp.get(`${baseRoute}/balance`, this.getBalance);
    expressApp.get(`${baseRoute}/my-balance`, checkJwt, this.getMyBalance);
    expressApp.post(
      `${baseRoute}/confirm-purchase`,
      checkJwt,
      this.confirmCodePurchase
    );
  }
}
