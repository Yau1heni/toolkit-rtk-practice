import { createSlice } from "@reduxjs/toolkit";
import {
  authAPI,
  LoginPayloadType,
  RegisterPayloadType,
  ResponseLoginType,
} from "features/auth/auth-api";
import { StatusType } from "common/types/types";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

type InitialStateType = {
  profile: null | ResponseLoginType;
  status: StatusType;
};

const initialState: InitialStateType = {
  profile: null,
  status: "idle",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

const register = createAppAsyncThunk<void, RegisterPayloadType>(
  "auth/register",
  async (payload, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authAPI.register(payload);
    });
  }
);

const login = createAppAsyncThunk<{ profile: ResponseLoginType }, LoginPayloadType>(
  "auth/login",
  async (payload, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authAPI.login(payload);
        return { profile: res.data };
      },
      false //deleting a global error to eliminate duplication of the error
    );
  }
);

export const authReducer = slice.reducer;
export const authThunks = { register, login };
