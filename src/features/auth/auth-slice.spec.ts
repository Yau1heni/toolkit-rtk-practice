import { authReducer, authThunks } from "features/auth/auth-slice";

describe("authReducer", () => {
  const initialState = {
    isLoggedIn: false,
  };

  it("should set isLoading correctly", () => {
    const data = {
      email: "mock@email.com",
      password: "123456789",
      rememberMe: false,
    };

    const action = authThunks.login.fulfilled({ isLoggedIn: true }, "requestId", data);
    const state = authReducer(initialState, action);

    expect(state.isLoggedIn).toEqual(true);
  });
});
