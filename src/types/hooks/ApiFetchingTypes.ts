export type Result<T> = {
  data?: T;
  error?: unknown;
  isFetching: boolean;
  isRefreshing: boolean;
  refresh: () => void;
};
