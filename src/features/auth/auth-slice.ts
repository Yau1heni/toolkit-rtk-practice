import { createSlice } from "@reduxjs/toolkit";
import { authAPI, ProfilePayloadType, RegisterPayloadType } from "features/auth/auth-api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { appActions } from "app/store/app-slice";

type InitialStateType = {
  isLoggedIn: boolean;
};

const initialState: InitialStateType = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});

const registration = createAppAsyncThunk<void, RegisterPayloadType>(
  "auth/register",
  async (payload, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authAPI.register(payload);
    });
  }
);

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, ProfilePayloadType>(
  "auth/login",
  async (payload, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        await authAPI.login(payload);
        thunkAPI.dispatch(appActions.setAppInitialized({ isInitialized: true }));
        return { isLoggedIn: true };
      },
      false //deleting a global error to eliminate duplication of the error
    );
  }
);

export const authReducer = slice.reducer;
export const authThunks = { registration, login };
