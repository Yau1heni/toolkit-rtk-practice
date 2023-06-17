import { RootState } from "app/store/store";

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
