import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import collectionsReducer from "./collectionsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    collections: collectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
