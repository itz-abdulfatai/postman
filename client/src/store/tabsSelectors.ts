/**
 * Tab utilities and selectors for use throughout the app
 * These functions help with tab state management and selection
 */

import type { RootState } from "./index";
import type { TabItem } from "../../types";

/**
 * Get all tabs from the state
 */
export const selectAllTabs = (state: RootState): TabItem[] => state.tabs.tabs;

/**
 * Get the active tab ID
 */
export const selectActiveTabId = (state: RootState): string | null =>
  state.tabs.activeTabId;

/**
 * Get the currently active tab object
 * Returns null if no tab is active
 */
export const selectActiveTab = (state: RootState): TabItem | null => {
  const activeTabId = state.tabs.activeTabId;
  if (!activeTabId) return null;
  return state.tabs.tabs.find((tab) => tab.id === activeTabId) ?? null;
};

/**
 * Get a specific tab by ID
 */
export const selectTabById = (
  state: RootState,
  tabId: string
): TabItem | null => state.tabs.tabs.find((tab) => tab.id === tabId) ?? null;

/**
 * Get the total number of open tabs
 */
export const selectTabsCount = (state: RootState): number =>
  state.tabs.tabs.length;

/**
 * Check if a specific tab is active
 */
export const selectIsTabActive = (state: RootState, tabId: string): boolean =>
  state.tabs.activeTabId === tabId;

/**
 * Get all tabs for a specific collection
 */
export const selectTabsByCollectionId = (
  state: RootState,
  collectionId: string
): TabItem[] =>
  state.tabs.tabs.filter((tab) => tab.collectionId === collectionId);

/**
 * Get a tab by collection and request ID combination
 */
export const selectTabByCollectionAndRequest = (
  state: RootState,
  collectionId: string,
  requestId: string
): TabItem | null =>
  state.tabs.tabs.find(
    (tab) => tab.collectionId === collectionId && tab.requestId === requestId
  ) ?? null;

/**
 * Get all tabs in a specific view mode
 */
export const selectTabsByViewMode = (
  state: RootState,
  viewMode: "viewing" | "editing"
): TabItem[] => state.tabs.tabs.filter((tab) => tab.viewMode === viewMode);

/**
 * Get all tabs in editing mode
 */
export const selectEditingTabs = (state: RootState): TabItem[] =>
  selectTabsByViewMode(state, "editing");

/**
 * Get all tabs in viewing mode
 */
export const selectViewingTabs = (state: RootState): TabItem[] =>
  selectTabsByViewMode(state, "viewing");

/**
 * Check if there are any unsaved changes (tabs in editing mode)
 */
export const selectHasUnsavedChanges = (state: RootState): boolean =>
  state.tabs.tabs.some((tab) => tab.viewMode === "editing");

/**
 * Get the index of a tab in the tabs array
 */
export const selectTabIndex = (state: RootState, tabId: string): number =>
  state.tabs.tabs.findIndex((tab) => tab.id === tabId);

/**
 * Get the tab at a specific index
 */
export const selectTabAtIndex = (
  state: RootState,
  index: number
): TabItem | null =>
  index >= 0 && index < state.tabs.tabs.length ? state.tabs.tabs[index] : null;

/**
 * Get the next tab after a specific tab (for tab navigation)
 */
export const selectNextTab = (
  state: RootState,
  currentTabId: string
): TabItem | null => {
  const index = selectTabIndex(state, currentTabId);
  return index >= 0 && index < state.tabs.tabs.length - 1
    ? state.tabs.tabs[index + 1]
    : null;
};

/**
 * Get the previous tab before a specific tab (for tab navigation)
 */
export const selectPreviousTab = (
  state: RootState,
  currentTabId: string
): TabItem | null => {
  const index = selectTabIndex(state, currentTabId);
  return index > 0 ? state.tabs.tabs[index - 1] : null;
};

/**
 * Get tabs sorted by most recently opened
 */
export const selectTabsSortedByRecent = (state: RootState): TabItem[] =>
  [...state.tabs.tabs].sort(
    (a, b) => b.openedAt.getTime() - a.openedAt.getTime()
  );

/**
 * Check if a specific collection has any open tabs
 */
export const selectHasOpenTabsForCollection = (
  state: RootState,
  collectionId: string
): boolean => state.tabs.tabs.some((tab) => tab.collectionId === collectionId);

/**
 * Get the count of open tabs for a specific collection
 */
export const selectOpenTabCountForCollection = (
  state: RootState,
  collectionId: string
): number =>
  state.tabs.tabs.filter((tab) => tab.collectionId === collectionId).length;
