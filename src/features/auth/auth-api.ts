import { instance } from "common/api/common-api";

export const authAPI = {
  register(payload: RegisterPayloadType) {
    return instance.post<ResponseRegisterType>("auth/register", payload);
  },
  login(payload: ProfilePayloadType) {
    return instance.post<ResponseLoginType>("auth/login", payload);
  },
  me() {
    return instance.post<ResponseLoginType>("auth/me", {});
  },
};

export type RegisterPayloadType = Omit<ProfilePayloadType, "rememberMe">;

export type ProfilePayloadType = {
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
  tokenDeathTime: number;
};

export type ResponseRegisterType = {
  addedUser: Omit<ResponseLoginType, "token" | "tokenDeathTime">;
};
