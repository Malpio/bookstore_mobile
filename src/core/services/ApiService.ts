import axios, {
  AxiosResponse,
  AxiosRequestConfig as RequestConfig,
} from 'axios';
import { ApiConfig } from '../config/ApiConfig';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const points = {
  login: '/api/auth/signin/',
  register: '/api/auth/signup/',
  test: 'api/test/all/',
};

export interface AxiosRequestConfig extends RequestConfig {}

export const request = axios.create({
  baseURL: ApiConfig.baseUrl,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

request.interceptors.request.use((config: RequestConfig) => {
  const newConfig = { ...config };
  if (newConfig.headers['Content-Type'] === 'multipart/form-data')
    return newConfig;
  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }
  return newConfig;
});
