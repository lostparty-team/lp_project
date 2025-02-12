type UserCredentials = {
  userId: string;
  password: string;
};

type RegisterInfo = UserCredentials & {
  confirmPassword: string;
  api: string;
};

type LoginInfo = UserCredentials;

type ResponseToken = {
  access_token: string;
};

export type { UserCredentials, RegisterInfo, LoginInfo, ResponseToken };
