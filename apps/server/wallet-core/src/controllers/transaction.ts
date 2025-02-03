import { Express, NextFunction, Request, Response } from 'express';
import { TransactionService } from '../services';
import { checkJwt } from '../utils/checkJwt';


export class TransactionControllerClass {
  public getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId }: any = req;
    if (!userId) {
      res.status(400).json({ message: this.errors.requiredUserId });
      return;
    }
    try {
      const response = await TransactionService.getBalance(userId);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private errors = {
    requiredUserId: 'User ID is required.',
    accessDenied: 'ACCESS DENIED',
  };

  setRoutes(expressApp: Express, baseRoute?: string): void {
    expressApp.get(`${baseRoute}/transactions`, checkJwt, this.getTransactions);
  }
}
