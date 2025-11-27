import type { AppDispatch, RootState } from "./index";
import type { CollectionType } from "../../types";
type RequestType = CollectionType["requests"][number];
import { setActiveCollection, setActiveRequest } from "./uiSlice";

export const activateCollection =
  (collectionId: string | null) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setActiveCollection(collectionId));

    // if there's an active request and it's not part of the newly active collection,
    // clear it to maintain the invariant
    const state = getState();
    const activeRequestId = state.ui.activeRequestId;
    if (!activeRequestId || !collectionId) {
      // nothing to validate
      if (!collectionId) dispatch(setActiveRequest(null));
      return;
    }

    const col = state.collections.items.find(
      (c: CollectionType) => c.id === collectionId
    );
    if (
      !col ||
      !col.requests.some((r: RequestType) => r.id === activeRequestId)
    ) {
      dispatch(setActiveRequest(null));
    }
  };

/**
 * Activate a request. Optionally pass a collectionId to ensure the collection
 * is made active first. The thunk will ensure the activeRequest belongs to the
 * active collection and clear it otherwise.
 */
export const activateRequest =
  (requestId: string, collectionId?: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    if (collectionId && getState().ui.activeCollectionId !== collectionId) {
      dispatch(setActiveCollection(collectionId));
    }

    const state = getState();
    const activeColId = state.ui.activeCollectionId;
    if (!activeColId) {
      dispatch(setActiveRequest(null));
      return;
    }

    const col = state.collections.items.find(
      (c: CollectionType) => c.id === activeColId
    );
    if (!col) {
      dispatch(setActiveRequest(null));
      return;
    }
    const exists = col.requests.some((r: RequestType) => r.id === requestId);
    dispatch(setActiveRequest(exists ? requestId : null));
  };
