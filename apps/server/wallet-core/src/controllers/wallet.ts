import { Express, Request, Response } from 'express';
import { WalletService } from '../services';
import { checkJwt } from '../utils/checkJwt';


export class WalletControllerClass {
  public rechargeWallet = async (req: Request, res: Response) => {
    try {
      const { userId }: any = req;
      if (!userId) {
        throw new Error('Acceso denegado');
      }
      const { document, phone, amount } = req.body;
      const result = await WalletService.rechargeWallet(
        document,
        phone,
        amount,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public generatePurchaseCode = async (req: Request, res: Response) => {
    try {
      const { userId }: any = req;
      if (!userId) {
        throw new Error('Acceso denegado');
      }
      const { amount } = req.body;
      const result = await WalletService.generatePurchaseCode(
        userId,
        amount
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public getBalance = async (req: Request, res: Response) => {
    try {
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
      const { userId }: any = req;
      const result = await WalletService.getMyBalance(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public confirmCodePurchase = async (req: Request, res: Response) => {
    try {
      const { userId }: any = req;
      if (!userId) {
        throw new Error('Acceso denegado');
      }
      const { code } = req.body;
      const result = await WalletService.confirmCodePurchase(code, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  setRoutes(expressApp: Express, baseRoute?: string): void {
    expressApp.post(`${baseRoute}/recharge`, checkJwt, this.rechargeWallet);
    expressApp.post(`${baseRoute}/generate-code`, checkJwt ,this.generatePurchaseCode);
    expressApp.get(`${baseRoute}/balance`, this.getBalance);
    expressApp.get(`${baseRoute}/my-balance`, checkJwt, this.getMyBalance);
    expressApp.post(`${baseRoute}/confirm-code`, checkJwt, this.confirmCodePurchase);
  }
}
