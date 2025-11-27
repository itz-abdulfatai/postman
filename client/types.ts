import type { ReactElement } from "react";
import type { Icon } from "@phosphor-icons/react";

interface hasClass {
  className?: string;
}

export interface BtnProps extends hasClass {
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
  createdAt: Date;
  updatedAt: Date;
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

type RequestItem = {
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
  savedAt: Date;
};

export interface CollectionItemProps extends hasClass {
  collection: CollectionType;
  isActive: boolean;
  onClick: () => void;
}

export interface RequestItemProps extends hasClass {
  request: RequestItem;
  isActive: boolean;
  onClick: () => void;
}