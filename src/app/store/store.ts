import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "app/store/app-slice";
import { authReducer } from "features/auth/auth-slice";
import { packsReducer } from "features/packs/packs-slice";
import { cardsApi } from "features/cards/service/cards-api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
