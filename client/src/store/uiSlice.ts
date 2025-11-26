import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CollectionType } from "../../types";
import { collections } from "../constants";

interface UIState {
  activeCollectionId: string | null;
  activeRequestId: string | null;
}

const initialState: UIState = {
  activeCollectionId: collections[0]?.id ?? null,
  activeRequestId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveCollection(state: UIState, action: PayloadAction<string | null>) {
      state.activeCollectionId = action.payload;

      if (!action.payload) {
        state.activeRequestId = null;
        return;
      }

      const col = collections.find((c) => c.id === action.payload) as
        | CollectionType
        | undefined;

      // if current active request is not part of the newly active collection,
      // clear the active request (per requirement)
      if (!col) {
        state.activeRequestId = null;
      } else if (
        state.activeRequestId &&
        !col.requests.some((r) => r.id === state.activeRequestId)
      ) {
        state.activeRequestId = null;
      }
    },
    setActiveRequest(state: UIState, action: PayloadAction<string | null>) {
      const requestId = action.payload;

      if (!requestId) {
        state.activeRequestId = null;
        return;
      }

      // Only set the active request if it belongs to the current active collection.
      // If it doesn't, clear the activeRequest (enforce invariant).
      const col = collections.find((c) => c.id === state.activeCollectionId);
      if (!col) {
        state.activeRequestId = null;
        return;
      }

      const exists = col.requests.some((r) => r.id === requestId);
      state.activeRequestId = exists ? requestId : null;
    },
  },
});

export const { setActiveCollection, setActiveRequest } = uiSlice.actions;
export default uiSlice.reducer;
