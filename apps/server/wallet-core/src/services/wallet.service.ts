import { Wallet, User, Transaction, ConfirmationCode } from '@libs/db';
import nodemailer from 'nodemailer';
import { TransactionType, TransactionStatus } from '@libs/shared';
import { generateToken } from '../utils/generateToken';
import { Jwt } from '../utils/jwt';
import * as bcrypt from 'bcrypt';

export class WalletService {
  static async rechargeWallet(
    document: string,
    phone: string,
    amount: number,
  ) {
    try {
      const user = await User.findOne({ document, phone });
      if (!user) {
        throw new Error('Cliente no encontrado.');
      }
      const wallet = await Wallet.findOne({ userId: user._id });
      if (!wallet) {
        throw new Error('Billetera no encontrada.');
      }
      wallet.balance += amount;
      await wallet.save();
      const transaction = await Transaction.create({
        userId: user._id,
        amount,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.COMPLETED,
      });
      await transaction.save();
      return {
        message: 'Recarga realizada con exito.',
        balance: wallet.balance,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async generatePurchaseCode(userId: string, amount: number) {
    try {
      const user = await User.findById({ _id: userId });
      if (!user) {
        throw new Error('Usuario no encontrado.');
      }
      const wallet = await Wallet.findOne({ userId: user._id });
      if (!wallet) {
        throw new Error('Billetera no encontrada.');
      }
      if (wallet.balance < amount) {
        throw new Error('Saldo insuficiente.');
      }
      const getLastCode = await ConfirmationCode.findOne({
        userId: user._id,
        used: false,
      })
        .sort({ createdAt: -1 })
        .limit(1);
      
      if (getLastCode) {
        getLastCode.used = true;
        await getLastCode.save();
      }

      const token = generateToken();
      console.log('🚀 ~ WalletService ~ token:', token);
      const hashToken = await bcrypt.hash(token, 10);
      const sessionId = await Jwt.createTokenPurchase(wallet);
      const confirmationCodeRes = await ConfirmationCode.create({
        userId: user._id,
        code: hashToken,
        sessionId,
        amount,
        expiresAt: new Date(Date.now() + 5 * 60000),
      });
      await confirmationCodeRes.save();
      
      return { message: 'Codigo de confirmación generado y enviado al correo.', code: token };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async confirmCodePurchase(code: string, userId: string) {
    try {
      const transactionCode = await ConfirmationCode.findOne({
        userId,
        used: false,
      })
        .sort({ createdAt: -1 })
        .limit(1);
      
      const session: any = await Jwt.verifyPurchaseToken(
        transactionCode.sessionId
      );
      if (!session?.userId || !session?._id) {
        throw new Error('Sesion invalida.');
      }
      const confirmationCode = await bcrypt.compareSync(
        code,
        transactionCode.code
      );
      if (!confirmationCode) {
        throw new Error('Codigo invalido.');
      }
      const expiresAt = new Date(transactionCode.expiresAt);
      if (expiresAt < new Date()) {
        throw new Error('Codigo expirado.');
      }
      const wallet = await Wallet.findOne({ userId });
      wallet.balance -= transactionCode.amount;
      await wallet.save();
      transactionCode.used = true;
      await transactionCode.save();
      const transaction = await Transaction.create({
        userId,
        amount: transactionCode.amount,
        type: TransactionType.PURCHASE,
        status: TransactionStatus.COMPLETED,
      });
      await transaction.save();
      return { message: 'Compra realizada con exito.'};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getBalance(document: string, phone: string) {
    try {
      const user = await User.findOne({ document, phone });
      if (!user) {
        throw new Error('Usuario no encontrado.');
      }
      const wallet = await Wallet.findOne({ user: user._id });
      if (!wallet) {
        throw new Error('Billetera no encontrada.');
      }
      return { balance: wallet.balance };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getMyBalance(userId) {
    try {
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        throw new Error('Billetera no encontrada.');
      }
      return { balance: wallet.balance };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
