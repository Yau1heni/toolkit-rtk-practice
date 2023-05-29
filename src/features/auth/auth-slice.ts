import { createSlice } from "@reduxjs/toolkit";
import {
  authAPI,
  LoginPayloadType,
  RegisterPayloadType,
  ResponseLoginType,
} from "features/auth/auth-api";
import { StatusType } from "common/types/types";
import { createAppAsyncThunk } from "common/utils/pre-typed/createAppAsyncThunk";

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
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.status = "idle";
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const register = createAppAsyncThunk<void, RegisterPayloadType>(
  "auth/register",
  async (payload) => {
    await authAPI.register(payload);
  }
);

const login = createAppAsyncThunk<{ profile: ResponseLoginType }, LoginPayloadType>(
  "auth/login",
  async (payload) => {
    const res = await authAPI.login(payload);
    return { profile: res.data };
  }
);

export const authReducer = slice.reducer;
export const authThunks = { register, login };
