export type ServerResponse<T> = {
  data: T;
  message: string;
  status: string;
};
