import { User, Transaction } from '@libs/db'; // Ensure this model exists
import { TransactionType, TransactionStatus } from '@libs/shared';

export class TransactionService {
  static async getBalance(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('No se encontró el usuario');
      }

      const transactions = await Transaction.find({ userId: user._id }).sort({ createdAt: 1 });

      if (!transactions) {
        throw new Error('No se encontraron transacciones');
      }

      let balance = 0;
      transactions.forEach((transaction) => {
        if (transaction.type === TransactionType.DEPOSIT) {
          balance += transaction.amount;
        } else {
          balance -= transaction.amount;
        }
      });

      return { message: 'El Balance se ha obtenido correctamente', balance, transactions};
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
