import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TabItem,
  TabsState,
  CollectionTab,
  RequestTab,
} from "../../types";

const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    /**
     * Add a collection tab and set it as active
     * viewMode is always "viewing" for initial tab creation
     */
    addCollectionTab(
      state,
      action: PayloadAction<{
        collectionId: string;
      }>
    ) {
      const newTabId = `tab-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
      const newTab: CollectionTab = {
        id: newTabId,
        type: "collection",
        collectionId: action.payload.collectionId,
        viewMode: "viewing",
        openedAt: new Date().toISOString(),
      };

      state.tabs.push(newTab);
      state.activeTabId = newTabId;
    },

    /**
     * Add a request tab and set it as active
     * Includes parent collectionId for context
     * viewMode is always "viewing" for initial tab creation
     */
    addRequestTab(
      state,
      action: PayloadAction<{
        requestId: string;
        collectionId: string;
      }>
    ) {
      const newTabId = `tab-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
      const newTab: RequestTab = {
        id: newTabId,
        type: "request",
        requestId: action.payload.requestId,
        collectionId: action.payload.collectionId,
        viewMode: "viewing",
        openedAt: new Date().toISOString(),
      };

      state.tabs.push(newTab);
      state.activeTabId = newTabId;
    },

    /**
     * Remove a tab from the tabs array
     * If the removed tab was active, activate the previous or next tab
     */
    removeTab(state, action: PayloadAction<string>) {
      const tabIdToRemove = action.payload;
      const tabIndex = state.tabs.findIndex((t) => t.id === tabIdToRemove);

      if (tabIndex === -1) return;

      state.tabs.splice(tabIndex, 1);

      // If the removed tab was active, activate another tab
      if (state.activeTabId === tabIdToRemove) {
        if (state.tabs.length === 0) {
          state.activeTabId = null;
        } else {
          // Prefer the previous tab, fall back to next tab
          const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0;
          state.activeTabId = state.tabs[newActiveIndex].id;
        }
      }
    },

    /**
     * Update a tab's properties (mainly viewMode)
     */
    updateTab(
      state,
      action: PayloadAction<{
        tabId: string;
        updates: Partial<Pick<TabItem, "viewMode">>;
      }>
    ) {
      const tab = state.tabs.find((t) => t.id === action.payload.tabId);
      if (tab) {
        Object.assign(tab, action.payload.updates);
      }
    },

    /**
     * Set the active tab
     */
    setActiveTab(state, action: PayloadAction<string | null>) {
      state.activeTabId = action.payload;
    },

    /**
     * Reorder tabs by moving a tab from one position to another
     */
    reorderTabs(
      state,
      action: PayloadAction<{
        fromIndex: number;
        toIndex: number;
      }>
    ) {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex < 0 ||
        fromIndex >= state.tabs.length ||
        toIndex < 0 ||
        toIndex >= state.tabs.length
      ) {
        return;
      }

      const [movedTab] = state.tabs.splice(fromIndex, 1);
      state.tabs.splice(toIndex, 0, movedTab);
    },

    /**
     * Close all tabs
     */
    clearAllTabs(state) {
      state.tabs = [];
      state.activeTabId = null;
    },

    /**
     * Replace a collection tab with a new one
     */
    replaceCollectionTab(
      state,
      action: PayloadAction<{
        tabIdToReplace: string;
        collectionId: string;
      }>
    ) {
      const tabIndex = state.tabs.findIndex(
        (t) => t.id === action.payload.tabIdToReplace
      );

      if (tabIndex === -1) return;

      const newTab: CollectionTab = {
        id: action.payload.tabIdToReplace,
        type: "collection",
        collectionId: action.payload.collectionId,
        viewMode: "viewing",
        openedAt: new Date().toISOString(),
      };

      state.tabs[tabIndex] = newTab;
      state.activeTabId = action.payload.tabIdToReplace;
    },

    /**
     * Replace a request tab with a new one
     */
    replaceRequestTab(
      state,
      action: PayloadAction<{
        tabIdToReplace: string;
        requestId: string;
        collectionId: string;
      }>
    ) {
      const tabIndex = state.tabs.findIndex(
        (t) => t.id === action.payload.tabIdToReplace
      );

      if (tabIndex === -1) return;

      const newTab: RequestTab = {
        id: action.payload.tabIdToReplace,
        type: "request",
        requestId: action.payload.requestId,
        collectionId: action.payload.collectionId,
        viewMode: "viewing",
        openedAt: new Date().toISOString(),
      };

      state.tabs[tabIndex] = newTab;
      state.activeTabId = action.payload.tabIdToReplace;
    },
  },
});

export const {
  addCollectionTab,
  addRequestTab,
  removeTab,
  updateTab,
  setActiveTab,
  reorderTabs,
  clearAllTabs,
  replaceCollectionTab,
  replaceRequestTab,
} = tabsSlice.actions;

export default tabsSlice.reducer;
