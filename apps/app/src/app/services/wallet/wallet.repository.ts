import { apiConnector } from "../api-connetor";
import { ICreatePurchase, IConfirmPurchase, IRechargeWallet } from "./types";

export async function postCreatePurchase(amount: number): Promise<any> {
  return apiConnector.post<ICreatePurchase, any>('purchase', { amount });
}
export async function postConfirmPurchase(code: string): Promise<any> {
  return apiConnector.post<IConfirmPurchase, any>('confirm-purchase', { code });
}

export async function postRechargeWallet(data: IRechargeWallet): Promise<any> {
  return apiConnector.post('recharge', data);
}

export async function getListTransactions(): Promise<any> {
  return apiConnector.get(`transactions`);
}   

export async function getMyBalance(): Promise<any> {
  return apiConnector.get(`my-balance`);
}

