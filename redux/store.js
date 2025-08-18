import orderReducer from "./slices/orderSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "data",
  storage,
  blacklist: ["counter"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    order: orderReducer,
    auth: authReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      },
    });
  },
  devTools: import.meta.env.VITE_ENVIRONMENT === "development",
});

export const persistedStore = persistStore(store);

export default store;
