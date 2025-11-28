import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { openTabSmartType, TabItem, TabsState } from "../../types";

const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
};

/**
 * Smart tab opening thunk that handles the logic:
 * - If the active tab is in viewing mode, replace it with the new tab
 * - Otherwise, add a new tab
 */
export const openTabSmart = createAsyncThunk(
  "tabs/openTabSmart",
  async ({ collectionId, requestId, tabs, activeTabId }: openTabSmartType) => {
    // Check if a tab already exists for this collection + request combination
    const existingTab = tabs.find(
      (tab) => tab.collectionId === collectionId && tab.requestId === requestId
    );

    // If it exists, just activate it
    if (existingTab) {
      return {
        action: "activate" as const,
        tabId: existingTab.id,
      };
    }

    // Check if active tab is in viewing mode and should be replaced
    const activeTab = activeTabId
      ? tabs.find((t) => t.id === activeTabId)
      : null;
    const shouldReplace = activeTab && activeTab.viewMode === "viewing";

    return {
      action: shouldReplace ? ("replace" as const) : ("add" as const),
      collectionId,
      requestId,
      replaceTabId: shouldReplace ? activeTabId : undefined,
    };
  }
);

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    /**
     * Add a new tab to the tabs array and set it as active
     */
    addTab(
      state,
      action: PayloadAction<{
        collectionId: string;
        requestId: string;
      }>
    ) {
      const newTabId = `tab-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newTab: TabItem = {
        id: newTabId,
        collectionId: action.payload.collectionId,
        requestId: action.payload.requestId,
        viewMode: "viewing",
        openedAt: new Date(),
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
        updates: Partial<Omit<TabItem, "id">>;
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
     * Replace a specific tab with a new one
     * Used when replacing a viewing-mode tab with a new request
     */
    replaceTab(
      state,
      action: PayloadAction<{
        tabIdToReplace: string;
        collectionId: string;
        requestId: string;
      }>
    ) {
      const tabIndex = state.tabs.findIndex(
        (t) => t.id === action.payload.tabIdToReplace
      );

      if (tabIndex === -1) return;

      const newTab: TabItem = {
        id: action.payload.tabIdToReplace,
        collectionId: action.payload.collectionId,
        requestId: action.payload.requestId,
        viewMode: "viewing",
        openedAt: new Date(),
      };

      state.tabs[tabIndex] = newTab;
      state.activeTabId = action.payload.tabIdToReplace;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openTabSmart.fulfilled, (state, action) => {
      const { action: smartAction } = action.payload;

      if (smartAction === "activate") {
        state.activeTabId = action.payload.tabId;
      } else if (smartAction === "replace") {
        const replaceTabId = action.payload.replaceTabId;
        if (!replaceTabId) return;

        const tabIndex = state.tabs.findIndex((t) => t.id === replaceTabId);

        if (tabIndex !== -1) {
          state.tabs[tabIndex] = {
            id: replaceTabId,
            collectionId: action.payload.collectionId,
            requestId: action.payload.requestId,
            viewMode: "viewing",
            openedAt: new Date(),
          };
          state.activeTabId = replaceTabId;
        }
      } else if (smartAction === "add") {
        const newTabId = `tab-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const newTab: TabItem = {
          id: newTabId,
          collectionId: action.payload.collectionId,
          requestId: action.payload.requestId,
          viewMode: "viewing",
          openedAt: new Date(),
        };

        state.tabs.push(newTab);
        state.activeTabId = newTabId;
      }
    });
  },
});

export const {
  addTab,
  removeTab,
  updateTab,
  setActiveTab,
  reorderTabs,
  clearAllTabs,
  replaceTab,
} = tabsSlice.actions;

export default tabsSlice.reducer;
