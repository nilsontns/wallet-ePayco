export type ICreatePurchase = {
  amount: number;
};

export type IConfirmPurchase = {
  code: string;
}

export type IRechargeWallet = {
  document: string;
  phone: string;
  amount: number;
};
