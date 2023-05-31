import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store/store";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "app/routes/routes";
import { GlobalStatus } from "common/components/global-status/global-status";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
    <RouterProvider router={routes} />
    <GlobalStatus />
  </Provider>
);

reportWebVitals();
