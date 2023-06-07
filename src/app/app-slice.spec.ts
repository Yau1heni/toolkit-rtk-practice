import { appActions, appReducer, appThunk } from "app/store/app-slice";

describe("appReducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isInitialized: false,
    profile: null,
  };

  it("should set isLoading correctly", () => {
    const action = appActions.setIsLoading({ isLoading: true });
    const state = appReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it("should set error correctly", () => {
    const action = appActions.setError({ error: "An error has occurred." });
    const state = appReducer(initialState, action);

    expect(state.error).toEqual("An error has occurred.");
  });

  it("should initialized work correctly and return profile", () => {
    const profile = {
      _id: "6435620aaf58963e887fb0f4",
      email: "mock@gmail.com",
      rememberMe: false,
      isAdmin: false,
      name: "mock",
      verified: false,
      publicCardPacksCount: 3,
      created: "2023-04-11T13:35:06.046Z",
      updated: "2023-05-05T06:35:21.310Z",
      __v: 0,
      token: "023f67e0-eb0f-11ed-b359-fbf835b5a380",
      tokenDeathTime: 1683279321310,
    };

    const action = appThunk.initialized.fulfilled({ profile, isInitialized: true }, "requestId");
    const state = appReducer(initialState, action);

    expect(state.profile).toEqual(profile);
    expect(state.isInitialized).toEqual(true);
  });
});
