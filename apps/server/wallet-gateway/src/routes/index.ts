import { json } from 'body-parser';
import { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  TransactionControllerClass,
  UserControllerClass,
  WalletControllerClass,
} from '../controllers';

export class RoutingService {

  private TransactionController = new TransactionControllerClass();
  private UserController = new UserControllerClass();
  private WalletController = new WalletControllerClass();
  
  mountApiRoutes(expressApp: Express, baseRoute = '') {
    expressApp.use('', (req, res, next) => {
      const contentType = req.headers['content-type'];
      if (
        contentType &&
        contentType !== 'application/json' &&
        !contentType.startsWith('multipart/form-data')
      ) {
        res.sendStatus(StatusCodes.UNSUPPORTED_MEDIA_TYPE);
      } else {
        next();
      }
    });

    expressApp.use(json());
    [
      this.TransactionController,
      this.UserController,
      this.WalletController,
    ].forEach((it) => {
      it.setRoutes(expressApp, baseRoute);
    });
  }
}
