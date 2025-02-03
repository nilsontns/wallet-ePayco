import FetchService from '../services/FetchService';

export const DEFAULT_EXPIRATION = 3600;
export const SESSION_TOKEN = 'SESSION_TOKEN';
export const LOGGED_USER = 'LOGGED_USER';
export const SESSION_EXPIRATION = 'SESSION_EXPIRATION';

export type LoginProps = {
  token: string;
  user_id: string;
  expiration?: number;
};

export default class SessionManager {
  private static instance: SessionManager;

  public lastUsedExpiration = DEFAULT_EXPIRATION;

  private constructor() {}

  public static getInstance = (): SessionManager => {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  };

  static login = ({
    token,
    user_id,
    expiration = DEFAULT_EXPIRATION,
  }: LoginProps): void => {
    FetchService.setBearerToken(token);
    localStorage.setItem(SESSION_TOKEN, token);
    localStorage.setItem(LOGGED_USER, user_id);
    localStorage.setItem(SESSION_EXPIRATION, `${expiration}`);
  };

  static logout = (): void => {
    FetchService.removeBearerToken();
    localStorage.removeItem(SESSION_TOKEN);
    localStorage.removeItem(LOGGED_USER);
    localStorage.removeItem(SESSION_EXPIRATION);
  };

  getToken = (): string => {
    return localStorage.getItem(SESSION_TOKEN) as string;
  };

  getLoggedUser = (): string => {
    return localStorage.getItem(LOGGED_USER) as string;
  };

  getExpiration = (): string => {
    return localStorage.getItem(SESSION_EXPIRATION) as string;
  };

  isLoggedIn = (): boolean => {
    return Boolean(localStorage.getItem(SESSION_TOKEN));
  };
}
