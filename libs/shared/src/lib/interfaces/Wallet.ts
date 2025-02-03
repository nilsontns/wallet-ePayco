import { Document, Schema } from 'mongoose';

export interface IWallet extends Document {
    userId: Schema.Types.ObjectId;
    balance: number;
    createdAt: Date;
}