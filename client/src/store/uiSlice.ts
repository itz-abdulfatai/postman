import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeCollectionId: string | null;
  activeRequestId: string | null;
}
// Ensure that all components consuming activeCollectionId can handle null values, especially during initial render.
const initialState: UIState = {
  activeCollectionId: null,
  activeRequestId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveCollection(state: UIState, action: PayloadAction<string | null>) {
      // store only the id — validation/enforcement happens in thunks
      state.activeCollectionId = action.payload;
    },
    setActiveRequest(state: UIState, action: PayloadAction<string | null>) {
      state.activeRequestId = action.payload;
    },
  },
});

export const { setActiveCollection, setActiveRequest } = uiSlice.actions;
export default uiSlice.reducer;
