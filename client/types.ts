import type { ReactElement } from "react";
import type { Icon } from "@phosphor-icons/react";

export type ISODateString = string;

interface hasClass {
  className?: string;
}
export type AnyFn = (...args: never[]) => unknown;

export interface BtnProps<T extends AnyFn = AnyFn> extends hasClass {
  onClick?: T;
  icon: ReactElement<Icon>;
  title?: string;
}

export interface AvatarProps {
  src?: string;
  alt?: string;
}

export interface MultiBtnProps extends hasClass {
  title: string;
}

export interface SearchInputProps extends hasClass {
  typing: boolean;
  setTyping: (typing: boolean) => void;
}

export interface CollectionType {
  id: string;
  name: string;
  description?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  folders?: Folder[];
  requests: RequestItem[];
  variables?: EnvVar[];
  auth?: AuthConfig;
  isFavourite?: boolean;
}

type Folder = {
  id: string;
  name: string;
  description?: string;
  requests: RequestItem[];
  folders?: Folder[];
};

export type RequestItem = {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  headers: Record<string, string>;
  params?: Record<string, string>;
  body?: RequestBody;
  auth?: AuthConfig; // request-level auth (overrides collection auth)
  savedResponse?: SavedResponse; // useful if you want a "Examples" feature later
};

type RequestBody =
  | { type: "none" }
  | { type: "json"; value: unknown }
  | {
      type: "form-data";
      value: Array<{ key: string; value: string; isFile?: boolean }>;
    }
  | { type: "x-www-form-urlencoded"; value: Record<string, string> }
  | {
      type: "raw";
      value: string;
      language?: "text" | "javascript" | "html" | "xml";
    };

type AuthConfig =
  | { type: "none" }
  | { type: "bearer"; token: string }
  | { type: "basic"; username: string; password: string }
  | { type: "apiKey"; key: string; value: string; addTo: "header" | "query" };

type EnvVar = {
  id: string;
  key: string;
  value: string;
  description?: string;
  enabled?: boolean;
};

type SavedResponse = {
  id: string;
  name?: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: {
    type: "json" | "text" | "html" | "xml" | "binary";
    value: unknown;
  };
  savedAt: ISODateString;
};

/**
 * Collection Tab - represents an open collection in a tab
 * type discriminator ensures we know this is a collection tab
 */
export interface CollectionTab {
  id: string; // unique tab identifier
  type: "collection"; // discriminator
  collectionId: string; // the collection being viewed
  viewMode: "viewing" | "editing"; // current mode of the tab
  openedAt: ISODateString; // timestamp when tab was opened
}

/**
 * Request Tab - represents an open request in a tab
 * type discriminator ensures we know this is a request tab
 */
export interface RequestTab {
  id: string; // unique tab identifier
  type: "request"; // discriminator
  requestId: string; // the request being viewed
  collectionId: string; // parent collection (for context and UI sync)
  viewMode: "viewing" | "editing"; // current mode of the tab
  openedAt: ISODateString; // timestamp when tab was opened
}

// Union type - a tab is EITHER a collection OR a request, never both
export type TabItem = CollectionTab | RequestTab;

export interface TabsState {
  tabs: TabItem[]; // array of all open tabs
  activeTabId: string | null; // id of the currently active tab
}

export interface CollectionItemProps extends hasClass {
  collection: CollectionType;
  isActive: boolean;
  onClick: () => void;
}

export interface RequestItemProps extends hasClass {
  request: RequestItem;
  isActive: boolean;
  onClick?: () => void;
  collectionId?: string; // parent collection ID for tab operations
}

export interface OpenTabSmartType {
  collectionId: string;
  requestId: string;
  tabs: TabItem[];
  activeTabId: string | null;
}

export interface TabChipProps extends hasClass {
  tab: TabItem;
  activeTabId: string | null;
}