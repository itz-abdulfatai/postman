import {
  ClockCounterClockwiseIcon,
  FolderIcon,
  LockIcon,
  PlusIcon,
  SquareLogoIcon,
  SquaresFourIcon,
  TrashSimpleIcon,
  TreeStructureIcon,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activateCollection } from "../../store/uiThunks";
import { Link } from "react-router-dom";
import SideBarSearchInput from "../home/SideBarSearchInput";

import CollectionItem from "../home/CollectionItem";
// import { useSelector } from "react-redux";

const menuItems: {
  name?: string;
  Icon: () => ReactElement<Icon>;
  link: string;
}[] = [
  { name: "Collections", link: "/", Icon: () => <TrashSimpleIcon /> },
  { name: "Environment", link: "/", Icon: () => <SquareLogoIcon /> },
  { name: "History", link: "/", Icon: () => <ClockCounterClockwiseIcon /> },
  { name: "Flows", link: "/", Icon: () => <TreeStructureIcon /> },
];

const HomeSidebar = () => {
  const [panelWidth, setPanelWidth] = useState(300); // width of the right panel
  const dispatch = useAppDispatch();
  const activeCollectionId = useAppSelector((s) => s.ui.activeCollectionId);
  const collections = useAppSelector((s) => s.collections.items);
  const isResizing = useRef(false);
  const startResize = () => {
    isResizing.current = true;
  };
  const stopResize = () => {
    isResizing.current = false;
  };

  const resize = (e: MouseEvent) => {
    if (!isResizing.current) return;

    // menu width = 80px (w-20)
    const newWidth = e.clientX - 80;
    const minWidth = 300;

    setPanelWidth(Math.min(Math.max(minWidth, newWidth), 750)); // min width
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);

  // useEffect(() => {
  //   console.clear();
  //   console.log(panelWidth);
  // }, [panelWidth]);

  return (
    <aside className="bg-secondary h-full flex flex-col border-r border-accent2 w-auto">
      {/* top nav */}
      <div className="w-full flexbox justify-between pl-4 pr-3 py-1.5 bborder border-accent2">
        <div className="flexbox gap-2">
          <LockIcon />
          {panelWidth > 42 && (
            <Link to="" className="text-xs font-semibold">
              My Workspace
            </Link>
          )}
        </div>
        {panelWidth > 143 && (
          <div className="flexbox gap-2">
            <button className="px-2 py-1 text-xs rounded-sm bg-accent2 font-semibold text-text">
              New
            </button>
            <button className="px-2 py-1 text-xs rounded-sm bg-accent2 font-semibold text-text-secondary">
              Import
            </button>
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex w-full flex-1 relative">
        {/* FIXED LEFT MENU */}
        <div className="w-20 border-r border-accent2 p-1 flex justify-between flex-col">
          <div className="flex flex-col gap-1 bborder pb-3 border-accent2">
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                className={`flex flex-col justify-center items-center gap-1 px-2 py-[9px] rounded-sm text-text hover:bg-accent2 ${
                  index === 0 && "bg-accent2"
                }`}
              >
                <menuItem.Icon />
                <span className="text-[10px]">{menuItem.name}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <button className="flex flex-col justify-center items-center  p-2 rounded-sm text-text hover:bg-accent2 h-[45px]">
              <SquaresFourIcon fontSize={20} />
            </button>
          </div>

          <div className="flex flex-col">
            <button className="flex flex-col justify-center items-center gap-1 p-2 rounded-sm text-text hover:bg-accent2">
              <FolderIcon />
              <span className="text-[10px]">Files</span>
              <span className="text-[10px] px-1 border border-dblue text-dblue font-semibold rounded-xs">
                BETA
              </span>
            </button>
          </div>
        </div>

        {/* RESIZABLE PANEL */}
        <div className="h-full py-2.5" style={{ width: panelWidth }}>
          <div className="flexbox w-full items-start justify-between">
            <button className="px-2.5 py-1.5 h-full flexbox justify-center">
              <PlusIcon className=" text-text-tertiary" />
            </button>

            <SideBarSearchInput />
          </div>
          {/* collections list */}
          <div className="py-1">
            {/* sort based on update at and isFavourite */}

            {collections.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                isActive={collection.id === activeCollectionId}
                onClick={() => {
                  if (activeCollectionId !== collection.id)
                    dispatch(activateCollection(collection.id));
                }}
              />
            ))}
          </div>
        </div>

        {/* DRAG HANDLE */}
        <div
          onMouseDown={startResize}
          className="w-0.5 h-full cursor-e-resize hover:bg-dblue"
        ></div>
      </div>
    </aside>
  );
};

export default HomeSidebar;
