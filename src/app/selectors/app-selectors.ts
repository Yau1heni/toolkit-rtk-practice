import { RootState } from "app/store/store";

export const isLoadingAppSelector = (state: RootState) => state.app.isLoading;
export const isInitializedAppSelector = (state: RootState) => state.app.isInitialized;
