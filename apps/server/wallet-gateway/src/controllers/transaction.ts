import { Express, NextFunction, Request, Response } from 'express';
import { TransactionService } from '../services';
import { checkJwt } from '../utils/checkJwt';

export class TransactionControllerClass {
  public getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token }: any = req;
    try {
      const response = await TransactionService.getBalance(token);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  setRoutes(expressApp: Express, baseRoute?: string): void {
    expressApp.get(`${baseRoute}/transactions`, checkJwt, this.getTransactions);
  }
}
