import { useState, type MouseEvent } from "react";
import type { CollectionItemProps } from "../../../types";
import {
  CaretDownIcon,
  CaretRightIcon,
  DotsThreeOutlineIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import Btn from "../global/Btn";

const CollectionItem = ({
  collection,
  className,
  isActive,
  onClick,
}: CollectionItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandRetract = (e: MouseEvent) => {
    console.log(e);

    e.stopPropagation();
    setExpanded(!expanded);

    // i only have the old value of expanded to work with
  };
  return (
    <button
      onClick={() => {
        onClick();
        setExpanded(true);
      }}
      className={
        className +
        ` w-full px-3.5 py-0.5 flexbox justify-between text-text-tertiary text-xs  group gborder  ${
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
    </button>
  );
};

export default CollectionItem;
