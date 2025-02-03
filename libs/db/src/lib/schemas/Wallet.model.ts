import { Schema, model } from "mongoose";
import { IWallet } from "@libs/shared";


const WalletSchema = new Schema<IWallet>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Wallet = model<IWallet>("Wallet", WalletSchema);
export { WalletSchema };

