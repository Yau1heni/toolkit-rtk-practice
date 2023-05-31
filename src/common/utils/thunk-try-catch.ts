import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/store/app-slice";
import { AxiosError, isAxiosError } from "axios";
import { AppDispatch, RootState } from "app/store/store";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>,
  logic: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setIsLoading({ isLoading: true }));
    return await logic();
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message;
      dispatch(appActions.setError({ error }));
    } else {
      dispatch(appActions.setError({ error: `Native error ${err.message}` }));
    }
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setIsLoading({ isLoading: false }));
  }
};
