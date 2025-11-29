import { TrashSimpleIcon, XIcon } from "@phosphor-icons/react";
import type { TabChipProps } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMethodColor } from "../../utils";
import Btn from "../global/Btn";
import {
  closeTab,
  switchToTab,
  toggleTabEditMode,
} from "../../store/tabsThunks";

const TabChip = ({ tab, activeTabId }: TabChipProps) => {
  const isArequest = tab.type === "request";
  // const isACollection = tab.type === "collection";
  const collection = useAppSelector((s) =>
    s.collections.items.find((collection) => collection.id === tab.collectionId)
  );
  let request;

  if (isArequest) {
    request = collection?.requests.find((req) => req.id === tab.requestId);
  }

  const dispatch = useAppDispatch();

  const deleteTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    // dispatch close tab action
    dispatch(closeTab(tab.id));
  };

  const enter = () => {
    dispatch(switchToTab(tab.id));
  };

  const makeEditing = () => {
    if (tab.viewMode !== "editing") {
      dispatch(toggleTabEditMode(tab.id));
    }
  };
  return (
    <div
      onClick={enter}
      onDoubleClick={makeEditing}
      key={tab.id}
      className={`${
        tab.id === activeTabId && "border-b-accent"
      } cursor-pointer flexbox shrink w-[170px] group relative mmin-w-fit  border-b border-accent2 gap-2 py-2.5 justify-center px-3 overflow-hidden`}
    >
      {/* METHOD OR ICON */}
      {isArequest ? (
        <span
          className={`text-[9px] font-semibold shrink-0 ${getMethodColor(
            request!
          )}`}
        >
          {request?.method === "DELETE" ? "DEL" : request?.method}
        </span>
      ) : (
        <span className="shrink-0">
          <TrashSimpleIcon />
        </span>
      )}

      {/* NAME */}
      <span
        className={`
      text-xs 
      whitespace-nowrap 
      ${tab.viewMode === "viewing" && "italic"}
      min-w-0
      sm:inline
      max-[80px]:hidden
    `}
      >
        {isArequest ? request?.name : collection?.name}
      </span>

      <Btn
        onClick={deleteTab}
        className=" absolute right-1 translayete-y-[-50%]  p-1 rounded-sm hover:bg-accent2 text-sm opacity-0 group-hover:opacity-100"
        icon={<XIcon className=" text-xs" />}
      />
    </div>
  );
};

export default TabChip;
