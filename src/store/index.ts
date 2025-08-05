import { configureStore } from "@reduxjs/toolkit";

//Import of the reducers
import localeReducer from "./slices/localeSlice";
import currentPageReducer from "./slices/currentPageSlice";
import currentLobbyReducer from "./slices/currentLobbySlice.ts";

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    currentPage: currentPageReducer,
    currentLobbyId: currentLobbyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
