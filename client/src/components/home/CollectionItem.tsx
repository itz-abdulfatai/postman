import { useState, type MouseEvent } from "react";
import type { CollectionItemProps } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  openCollectionTab,
  openCollectionTabInEditMode,
} from "../../store/tabsThunks";
import {
  CaretDownIcon,
  CaretRightIcon,
  DotsThreeOutlineIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import Btn from "../global/Btn";
import RequestItem from "./RequestItem";

const CollectionItem = ({
  collection,
  className,
  isActive,
}: CollectionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const activeRequestId = useAppSelector((s) => s.ui.activeRequestId);

  const handleExpandRetract = (e: MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  /**
   * Handle single click on collection
   * Single click: open collection in viewing mode (tab)
   */
  const handleCollectionClick = () => {
    dispatch(openCollectionTab(collection.id));
    setExpanded(true);
  };

  /**
   * Handle double click on collection
   * Double click: create/switch to collection tab in editing mode directly
   */
  const handleCollectionDoubleClick = () => {
    dispatch(openCollectionTabInEditMode(collection.id));
    setExpanded(true);
  };

  return (
    <div>
      <div
        onDoubleClick={handleCollectionDoubleClick}
        onClick={handleCollectionClick}
        className={
          className +
          ` w-full px-3.5 py-0.5 flexbox justify-between text-text-tertiary text-xs  group gborder cursor-pointer  ${
            isActive
              ? "bg-accent2 border-accent2 "
              : "hover:bg-accent2-fade hover:border-accent2-fade border-secondary"
          }`
        }
      >
        {/* static */}
        <div className="flexbox  gap-3">
          <button
            onClick={handleExpandRetract}
            className="hover:bg-accent2 rounded-sm"
          >
            {expanded ? <CaretDownIcon /> : <CaretRightIcon />}
          </button>
          <span className=" line-clamp-1 text-start">{collection.name}</span>
        </div>
        {/* displays on hover */}
        <div className=" flexbox gap-3 text-text-tertiary">
          <Btn
            className="flexbox justify-center p-1 rounded-sm hover:bg-accent2 text-sm hidden  group-hover:block"
            icon={<PlusIcon />}
          />

          <Btn
            className={`flexbox justify-center p-1 rounded-sm hover:bg-accent2 text-sm ${
              !collection.isFavourite && " invisible   group-hover:visible"
            } `}
            icon={
              <StarIcon weight={collection.isFavourite ? "fill" : undefined} />
            }
          />
          <Btn
            className="flexbox justify-center p-1 rounded-sm hover:bg-accent2 text-sm  hidden  group-hover:block"
            icon={<DotsThreeOutlineIcon />}
          />
        </div>
      </div>
      {/* requests */}

      {expanded && (
        <div>
          {collection.folders && collection.folders?.length > 0 && (
            <span>has collections</span>
          )}

          {collection.requests.map((request, index) => (
            <RequestItem
              request={request}
              key={index}
              isActive={request.id === activeRequestId}
              collectionId={collection.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionItem;
