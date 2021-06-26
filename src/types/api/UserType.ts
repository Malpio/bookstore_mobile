export type UserRoleType = 'ROLE_USER' | 'ROLE_ADMIN';

export type UserType = {
  id: number;
  email: string;
  username: string;
  token: string;
  roles: UserRoleType[];
  type: string;
};
