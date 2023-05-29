import { instance } from "common/api/common-api";

export const authAPI = {
  register(payload: RegisterPayloadType) {
    return instance.post<ResponseRegisterType>("auth/register", payload);
  },
  login(payload: LoginPayloadType) {
    return instance.post<ResponseLoginType>("auth/login", payload);
  },
};

export type RegisterPayloadType = Omit<LoginPayloadType, "rememberMe">;

export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ResponseLoginType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: string;
};

export type ResponseRegisterType = {
  addedUser: Omit<ResponseLoginType, "token" | "tokenDeathTime">;
};
