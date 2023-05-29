import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store/store";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "features/auth/register/register";
import { Login } from "features/auth/login/login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Start</div>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
    <App />
  </Provider>
);

reportWebVitals();
