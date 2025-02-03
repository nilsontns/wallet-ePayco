export * from './User';
export * from './Wallet';
export * from './Transaction';
export * from './ConfirmationCode'
export interface PaginatedData<T> {
    docs: T[];
    totalPages: number;
    totalDocs: number;
    page: number;
    limit: number;
  }
  