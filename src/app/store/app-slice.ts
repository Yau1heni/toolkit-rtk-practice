import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { authAPI, ResponseLoginType } from "features/auth/auth-api";

const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isInitialized: false,
  profile: null as null | ResponseLoginType,
};

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialized.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isInitialized = action.payload.isInitialized;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          if (!action.payload.showGlobalError) return;
          const err = action.payload.e as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
        }
      );
  },
});

const initialized = createAppAsyncThunk<
  { profile: ResponseLoginType; isInitialized: boolean },
  void
>("app/initialized", async (payload, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await authAPI.me();
      return { profile: res.data, isInitialized: true };
    },
    false
  );
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunk = { initialized };
