import { Schema } from "mongoose";

export interface IConfirmationCode extends Document {
    userId: Schema.Types.ObjectId;
    sessionId: string;
    code: string;
    expiresAt: Date;
    used: boolean;
    amount: number;
  }
  