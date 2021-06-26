import axios, {
  AxiosResponse,
  AxiosRequestConfig as RequestConfig,
} from 'axios';
import { ApiConfig } from '../config/ApiConfig';

export const points = {
  login: '/api/auth/signin/',
  register: '/api/auth/signup/',
  books: '/api/books/',
  myBooks: '/api/books/my_books/',
  rateBook: '/api/books/add_rate/',
  reviewBook: '/api/books/add_review/',
  status: '/api/books/status/',
  order: '/api/books/order/',
  myOrders: '/api/books/my_orders/',
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
