export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user_id: string;
  access_token?: string;
  requires_2fa?: boolean;
  email?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  document: string;
  phone: string;
  name: string;
};

export type Verify2FactorRequest = {
  email: string;
  token: string;
};

export type Verify2FactorResponse = {
  message: string;
  user_id: string;
  access_token: string;
};
