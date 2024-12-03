export type UserCredentials = {
  id: string;
  password: string;
};

export type RegisterInfo = UserCredentials & {
  confirmPassword: string;
  api: string;
};

export type LoginInfo = UserCredentials;
