import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "app/store/app-slice";
import { authReducer } from "features/auth/auth-slice";
import { packsReducer } from "features/packs/packs-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
