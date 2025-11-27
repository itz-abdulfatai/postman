import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CollectionType } from "../../types";
type RequestType = CollectionType["requests"][number];
import { collections as initialCollections } from "../constants";

interface CollectionsState {
  items: CollectionType[];
}

const initialState: CollectionsState = {
  items: sortCollections(
    initialCollections.map((c) => ({
      ...c,
      updatedAt: new Date(c.updatedAt),
    }))
  ),
};

function sortCollections(collections: CollectionType[]): CollectionType[] {
  return [...collections].sort((a, b) => {
    if (a.isFavourite !== b.isFavourite) {
      return Number(b.isFavourite) - Number(a.isFavourite);
    }

    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });
}

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections(state, action: PayloadAction<CollectionType[]>) {
      state.items = sortCollections(action.payload);
    },
    addCollection(state, action: PayloadAction<CollectionType>) {
      state.items.push(action.payload);
      state.items = sortCollections(state.items);
    },
    updateCollection(state, action: PayloadAction<CollectionType>) {
      const idx = state.items.findIndex((c) => c.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
      state.items = sortCollections(state.items);
    },
    removeCollection(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
      state.items = sortCollections(state.items);
    },
    // Request-level helpers
    addRequest(
      state,
      action: PayloadAction<{ collectionId: string; request: RequestType }>
    ) {
      const col = state.items.find((c) => c.id === action.payload.collectionId);
      if (col) col.requests.push(action.payload.request);
      state.items = sortCollections(state.items);
    },
    updateRequest(
      state,
      action: PayloadAction<{ collectionId: string; request: RequestType }>
    ) {
      const col = state.items.find((c) => c.id === action.payload.collectionId);
      if (!col) return;
      const idx = col.requests.findIndex(
        (r) => r.id === action.payload.request.id
      );
      if (idx >= 0) col.requests[idx] = action.payload.request;
      state.items = sortCollections(state.items);
    },
    removeRequest(
      state,
      action: PayloadAction<{ collectionId: string; requestId: string }>
    ) {
      const col = state.items.find((c) => c.id === action.payload.collectionId);
      if (!col) return;
      col.requests = col.requests.filter(
        (r) => r.id !== action.payload.requestId
      );
      state.items = sortCollections(state.items);
    },
  },
});

export const {
  setCollections,
  addCollection,
  updateCollection,
  removeCollection,
  addRequest,
  updateRequest,
  removeRequest,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
