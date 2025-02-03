import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {Config} from '../../config/constants';
const baseDomain = Config.URL_API_URL;

export default class FetchService {
  private static instance: FetchService;
  private static httpclient: AxiosInstance = axios.create({
    baseURL: baseDomain,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private constructor() {}

  public static getInstance = (): FetchService => {
    if (!FetchService.instance) {
      FetchService.instance = new FetchService();
    }
    return FetchService.instance;
  };

  private static readonly handleSuccess = (response: AxiosResponse) =>
    response.data;

  private static readonly handleError = (error: any) => {
    throw error.response;
  };

  get = <T>(url: string): Promise<T> =>
    FetchService.httpclient
      .get(url)
      .then(FetchService.handleSuccess, FetchService.handleError);

  post = <G, T>(
    url: string,
    bodyRq: G,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    FetchService.httpclient
      .post(url, bodyRq, config)
      .then(FetchService.handleSuccess, FetchService.handleError);

  public static setBearerToken = (token: string) => {
    FetchService.httpclient.defaults.headers.common["Authorization"] =
      "Bearer " + token;
  };

  public static removeBearerToken = () => {
    delete FetchService.httpclient.defaults.headers.common["Authorization"];
  };
}
