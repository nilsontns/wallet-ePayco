import { Schema, model } from "mongoose";
import { ITransaction, TransactionType, TransactionStatus } from "@libs/shared";

const TransactionSchema = new Schema<ITransaction>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: Object.values(TransactionType), required: true },
  sessionId: { type: String, unique: true, sparse: true },
  confirmationCode: { type: String },
  status: { type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.PENDING },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);
export { TransactionSchema };
