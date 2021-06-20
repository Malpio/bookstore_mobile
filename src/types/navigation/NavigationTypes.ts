import { LoginScreenType } from './ScreensTypes';

export type UserTabNavigatorParamsType = {
  BooksTab: undefined;
};

export type BooksNavigatorParamsType = {
  BooksListScreen: undefined;
};

export type RootStackParamsType = {
  UserTabNavigator: undefined;
  LoginScreen: LoginScreenType | undefined;
  RegisterScreen: undefined;
};
