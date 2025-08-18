import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import { Provider } from "react-redux";
import store, { persistedStore } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "./context/auth/AuthProvider";
import HistoryProvider from "./context/ticket/HistoryProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <AuthProvider>
          <HistoryProvider>
            <Router />
          </HistoryProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
