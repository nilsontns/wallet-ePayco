import { apiConnector } from "../api-connetor";
import {
  LoginRequest,
  RegisterRequest,
} from "./types";
import { ServerResponse } from "../ServerTypes";

export async function postLogin(data: LoginRequest): Promise<any> {
  return apiConnector
    .post<LoginRequest, ServerResponse<any>>('auth-login', data)
    .then((response) => response);
}

export async function postRegister(data: RegisterRequest): Promise<any> {
  return apiConnector
    .post<RegisterRequest, ServerResponse<any>>("register", data)
    .then((response) => response);
}

