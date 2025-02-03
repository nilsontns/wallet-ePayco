import { Schema } from "mongoose";

export enum TransactionType {
    DEPOSIT = "deposit",
    PURCHASE = "purchase",
}

export enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
}
  
export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  amount: number;
  type: TransactionType;
  sessionId?: string;
  confirmationCode?: string;
  status: TransactionStatus;
  createdAt: Date;
}