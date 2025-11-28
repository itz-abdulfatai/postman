/**
 * Tabs Thunks - Smart logic for tab operations and UI sync
 *
 * These thunks handle:
 * 1. Opening/switching tabs with smart logic
 * 2. Toggling between viewing and editing modes
 * 3. Syncing tab state with uiSlice (activeCollectionId, activeRequestId)
 */

import {
  createAsyncThunk,
  type ThunkAction,
  type AnyAction,
} from "@reduxjs/toolkit";
import type { RootState } from "./index";
import {
  addCollectionTab,
  addRequestTab,
  removeTab,
  setActiveTab,
  updateTab,
  replaceCollectionTab,
  replaceRequestTab,
} from "./tabsSlice";
import { setActiveCollection, setActiveRequest } from "./uiSlice";
import type { CollectionTab, RequestTab } from "../../types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

/**
 * Open a collection tab or switch to it if it already exists
 * Single tap behavior: always viewing mode
 */
export const openCollectionTab =
  (collectionId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const tabs = state.tabs.tabs;
    const activeTabId = state.tabs.activeTabId;

    // Check if this collection tab already exists
    const existingTab = tabs.find(
      (tab): tab is CollectionTab =>
        tab.type === "collection" && tab.collectionId === collectionId
    );

    if (existingTab) {
      // Tab exists - just activate it
      dispatch(setActiveTab(existingTab.id));
      dispatch(syncTabsWithUI());
    } else {
      // Tab doesn't exist - create it
      // Check if we should replace the active tab (smart logic)
      const activeTab = activeTabId
        ? tabs.find((t) => t.id === activeTabId)
        : null;
      const shouldReplace = activeTab && activeTab.viewMode === "viewing";

      if (shouldReplace && activeTab?.type === "collection") {
        // Replace the viewing collection tab
        dispatch(
          replaceCollectionTab({ tabIdToReplace: activeTab.id, collectionId })
        );
      } else if (shouldReplace && activeTab?.type === "request") {
        // Replace the viewing request tab with a collection tab
        dispatch(
          replaceCollectionTab({ tabIdToReplace: activeTab.id, collectionId })
        );
      } else {
        // Add new tab
        dispatch(addCollectionTab({ collectionId }));
      }

      dispatch(syncTabsWithUI());
    }
  };

/**
 * Open a request tab or switch to it if it already exists
 * Single tap behavior: always viewing mode
 */
export const openRequestTab =
  (requestId: string, collectionId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const tabs = state.tabs.tabs;
    const activeTabId = state.tabs.activeTabId;

    // Check if this request tab already exists
    const existingTab = tabs.find(
      (tab): tab is RequestTab =>
        tab.type === "request" &&
        tab.requestId === requestId &&
        tab.collectionId === collectionId
    );

    if (existingTab) {
      // Tab exists - check if we need to toggle edit mode
      // If it's already in viewing mode and user clicks again, just activate it
      dispatch(setActiveTab(existingTab.id));
      dispatch(syncTabsWithUI());
    } else {
      // Tab doesn't exist - create it
      // Check if we should replace the active tab (smart logic)
      const activeTab = activeTabId
        ? tabs.find((t) => t.id === activeTabId)
        : null;
      const shouldReplace = activeTab && activeTab.viewMode === "viewing";

      if (shouldReplace) {
        // Replace the viewing tab (whether collection or request)
        dispatch(
          replaceRequestTab({
            tabIdToReplace: activeTab.id,
            requestId,
            collectionId,
          })
        );
      } else {
        // Add new tab
        dispatch(addRequestTab({ requestId, collectionId }));
      }

      dispatch(syncTabsWithUI());
    }
  };

/**
 * Toggle a tab between editing and viewing mode
 * Double tap behavior: if viewing, switch to editing; if editing, stay editing
 */
export const toggleTabEditMode =
  (tabId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const tab = state.tabs.tabs.find((t) => t.id === tabId);

    if (!tab) return;

    // If it's in viewing mode, switch to editing
    // If it's in editing mode, keep it (don't toggle back)
    if (tab.viewMode === "viewing") {
      dispatch(updateTab({ tabId, updates: { viewMode: "editing" } }));
      dispatch(setActiveTab(tabId));
      dispatch(syncTabsWithUI());
    } else {
      // Already in editing mode - just make sure it's active
      dispatch(setActiveTab(tabId));
      dispatch(syncTabsWithUI());
    }
  };

/**
 * Sync the active tab with uiSlice
 * When active tab changes, update activeCollectionId and activeRequestId in uiSlice
 *
 * Rules:
 * - If active tab is a collection → set activeCollectionId, clear activeRequestId
 * - If active tab is a request → set activeRequestId and activeCollectionId (parent)
 * - If no active tab → clear both
 */
export const syncTabsWithUI = createAsyncThunk(
  "tabs/syncTabsWithUI",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const activeTabId = state.tabs.activeTabId;
    const tabs = state.tabs.tabs;

    const activeTab = activeTabId
      ? tabs.find((t) => t.id === activeTabId)
      : null;

    if (!activeTab) {
      // No active tab - clear UI state
      dispatch(setActiveCollection(null));
      dispatch(setActiveRequest(null));
    } else if (activeTab.type === "collection") {
      // Active tab is a collection
      dispatch(setActiveCollection(activeTab.collectionId));
      dispatch(setActiveRequest(null));
    } else if (activeTab.type === "request") {
      // Active tab is a request
      dispatch(setActiveRequest(activeTab.requestId));
      dispatch(setActiveCollection(activeTab.collectionId));
    }
  }
);

/**
 * Switch to a tab (for tab bar clicks)
 * Also syncs with uiSlice
 */
export const switchToTab =
  (tabId: string): AppThunk =>
  (dispatch) => {
    dispatch(setActiveTab(tabId));
    dispatch(syncTabsWithUI());
  };

/**
 * Close a tab and handle cleanup
 * If closed tab was active, next tab becomes active
 * UI state syncs automatically
 */
export const closeTab =
  (tabId: string): AppThunk =>
  (dispatch) => {
    dispatch(removeTab(tabId));
    dispatch(syncTabsWithUI());
  };

/**
 * Open a collection tab in editing mode directly (double tap behavior)
 * Creates or switches to collection tab and sets it to editing mode
 */
export const openCollectionTabInEditMode =
  (collectionId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const tabs = state.tabs.tabs;
    const activeTabId = state.tabs.activeTabId;

    // Check if this collection tab already exists
    const existingTab = tabs.find(
      (tab): tab is CollectionTab =>
        tab.type === "collection" && tab.collectionId === collectionId
    );

    if (existingTab) {
      // Tab exists - switch to it and set to editing mode
      dispatch(setActiveTab(existingTab.id));
      dispatch(
        updateTab({ tabId: existingTab.id, updates: { viewMode: "editing" } })
      );
    } else {
      // Tab doesn't exist - create it in editing mode
      const activeTab = activeTabId
        ? tabs.find((t) => t.id === activeTabId)
        : null;
      const shouldReplace = activeTab && activeTab.viewMode === "viewing";

      if (shouldReplace && activeTab?.type === "collection") {
        dispatch(
          replaceCollectionTab({ tabIdToReplace: activeTab.id, collectionId })
        );
        // Update the newly created tab to editing mode
        const newState = getState();
        const newTab = newState.tabs.tabs.find(
          (t): t is CollectionTab =>
            t.type === "collection" && t.collectionId === collectionId
        );
        if (newTab) {
          dispatch(
            updateTab({ tabId: newTab.id, updates: { viewMode: "editing" } })
          );
        }
      } else if (shouldReplace && activeTab?.type === "request") {
        dispatch(
          replaceCollectionTab({ tabIdToReplace: activeTab.id, collectionId })
        );
        const newState = getState();
        const newTab = newState.tabs.tabs.find(
          (t): t is CollectionTab =>
            t.type === "collection" && t.collectionId === collectionId
        );
        if (newTab) {
          dispatch(
            updateTab({ tabId: newTab.id, updates: { viewMode: "editing" } })
          );
        }
      } else {
        dispatch(addCollectionTab({ collectionId }));
        // Get the newly created tab and set it to editing mode
        const newState = getState();
        const newTab = newState.tabs.tabs.find(
          (t): t is CollectionTab =>
            t.type === "collection" && t.collectionId === collectionId
        );
        if (newTab) {
          dispatch(
            updateTab({ tabId: newTab.id, updates: { viewMode: "editing" } })
          );
        }
      }
    }

    dispatch(syncTabsWithUI());
  };

/**
 * Open a request tab in editing mode directly (double tap behavior)
 * Creates or switches to request tab and sets it to editing mode
 */
export const openRequestTabInEditMode =
  (requestId: string, collectionId: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const tabs = state.tabs.tabs;
    const activeTabId = state.tabs.activeTabId;

    // Check if this request tab already exists
    const existingTab = tabs.find(
      (tab): tab is RequestTab =>
        tab.type === "request" &&
        tab.requestId === requestId &&
        tab.collectionId === collectionId
    );

    if (existingTab) {
      // Tab exists - switch to it and set to editing mode
      dispatch(setActiveTab(existingTab.id));
      dispatch(
        updateTab({ tabId: existingTab.id, updates: { viewMode: "editing" } })
      );
    } else {
      // Tab doesn't exist - create it in editing mode
      const activeTab = activeTabId
        ? tabs.find((t) => t.id === activeTabId)
        : null;
      const shouldReplace = activeTab && activeTab.viewMode === "viewing";

      if (shouldReplace) {
        dispatch(
          replaceRequestTab({
            tabIdToReplace: activeTab.id,
            requestId,
            collectionId,
          })
        );
        // Get the newly created tab and set it to editing mode
        const newState = getState();
        const newTab = newState.tabs.tabs.find(
          (t): t is RequestTab =>
            t.type === "request" &&
            t.requestId === requestId &&
            t.collectionId === collectionId
        );
        if (newTab) {
          dispatch(
            updateTab({ tabId: newTab.id, updates: { viewMode: "editing" } })
          );
        }
      } else {
        dispatch(addRequestTab({ requestId, collectionId }));
        // Get the newly created tab and set it to editing mode
        const newState = getState();
        const newTab = newState.tabs.tabs.find(
          (t): t is RequestTab =>
            t.type === "request" &&
            t.requestId === requestId &&
            t.collectionId === collectionId
        );
        if (newTab) {
          dispatch(
            updateTab({ tabId: newTab.id, updates: { viewMode: "editing" } })
          );
        }
      }
    }

    dispatch(syncTabsWithUI());
  };
