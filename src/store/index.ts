import { configureStore } from "@reduxjs/toolkit";

//Import of the reducers
import localeReducer from "./slices/localeSlice";

export const store = configureStore({
  reducer: {
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
