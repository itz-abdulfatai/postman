import type { ReactElement } from "react";
import type { Icon } from "@phosphor-icons/react";

interface hasClass {
  className?: string;
}

export interface BtnProps extends hasClass {
  icon: ReactElement<Icon>;
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
