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

type ProcessInfo = {
  image: Blob;
};

export type { UserCredentials, RegisterInfo, LoginInfo, ResponseToken, ProcessInfo };
