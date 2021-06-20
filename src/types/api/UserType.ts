export enum UserRoleEnum {
  'ROLE_USER' = 'user',
  'ROLE_ADMIN' = 'admin',
}

export type UserType = {
  id: number;
  email: string;
  username: string;
  token: string;
  roles: UserRoleEnum[];
  type: string;
};
