import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "app/store/store";
import App from "app/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStatus } from "common/components/global-status/global-status";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
      <GlobalStatus />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
