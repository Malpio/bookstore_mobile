import { LoginScreenType } from './ScreensTypes';
import { BookListItemType } from '../api/BookTypes';

export type UserTabNavigatorParamsType = {
  BooksTab: { type: BookListScreenType };
  MyBooksTab: { type: BookListScreenType };
  OrdersTab: undefined;
  MoreTab: undefined;
};

export type BookListScreenType = 'all' | 'my';

export type BooksNavigatorParamsType = {
  BooksListScreen: { type: BookListScreenType };
  BookDetailsScreen: { id: number };
  OrderBookScreen: BookListItemType;
};

export type RootStackParamsType = {
  UserTabNavigator: undefined;
  LoginScreen: LoginScreenType | undefined;
  RegisterScreen: undefined;
};

export type MoreNavigatorParamsType = {
  MenuScreen: undefined;
  AddNewBookScreen: undefined;
  ManageBookScreen: undefined;
  EditBookScreen: { id: number };
};

export type OrderNavigatorParamsType = {
  OrderListScreen: undefined;
  OrderDetailsScreen: { id: number };
};
