import { useCallback, useState, useEffect } from 'react';
import {
  request,
  points,
  AxiosRequestConfig,
} from '../core/services/ApiService';
import { Result } from '../types/hooks/ApiFetchingTypes';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const useApiFetching = <T>(
  endpointKey: keyof typeof points,
  config?: AxiosRequestConfig,
  pk?: number,
): Result<T> => {
  const token = useSelector<RootState>((state) => state.user.token) as string;

  const [data, setData] = useState<T>();
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const endpoint = pk ? `${points[endpointKey]}${pk}` : points[endpointKey];
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      console.log('headers', headers);
      const response = await request.get<T>(endpoint, { headers, ...config });
      console.log('response', response);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
      setIsRefreshing(false);
    }
  }, [endpointKey]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    isFetching,
    isRefreshing,
    refresh,
  };
};

export default useApiFetching;
