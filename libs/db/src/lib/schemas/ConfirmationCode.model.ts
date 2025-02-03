import { Schema, model } from "mongoose";
import { IConfirmationCode } from "@libs/shared";

const ConfirmationCodeSchema = new Schema<IConfirmationCode>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  amount: { type: Number, required: true },
});

export const ConfirmationCode = model<IConfirmationCode>("ConfirmationCode", ConfirmationCodeSchema);
export { ConfirmationCodeSchema };
