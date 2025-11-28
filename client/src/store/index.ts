import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import collectionsReducer from "./collectionsSlice";
import tabsReducer from "./tabsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    collections: collectionsReducer,
    tabs: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
