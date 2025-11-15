import {
  ClockCounterClockwiseIcon,
  FolderIcon,
  LockIcon,
  SquareIcon,
  SquaresFourIcon,
  TrashSimpleIcon,
  TreeStructureIcon,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";

const menuItems: {
  name?: string;
  Icon: () => ReactElement<Icon>;
  link: string;
}[] = [
  {
    name: "Collections",
    link: "/",
    Icon: () => <TrashSimpleIcon />,
  },
  {
    name: "Environment",
    link: "/",
    Icon: () => <SquareIcon />,
  },
  {
    name: "History",
    link: "/",
    Icon: () => <ClockCounterClockwiseIcon />,
  },
  {
    name: "Flows",
    link: "/",
    Icon: () => <TreeStructureIcon />,
  },
];
const HomeSidebar = () => {
  const [panelWidth, setPanelWidth] = useState(300);
  const isResizing = useRef(false);

  const startResize = () => (isResizing.current = true);
  const stopResize = () => (isResizing.current = false);

  const resize = (e: MouseEvent) => {
    if (!isResizing.current) return;

    // Your menu is 80px (w-20)
    const newWidth = e.clientX - 80;

    setPanelWidth(Math.max(260, newWidth)); // minimum width 260px
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    };
  }, []);
  return (
    <aside className=" bg-secondary py-1 h-full flex flex-col border-r border-accent2 w-[360px]">
      {/* top nav */}
      <div className="w-full flexbox justify-between px-4 py-1.5 bborder border-accent2">
        {/* workspace */}
        <div className="flexbox gap-2">
          <LockIcon />
          <Link to={""} className="text-xs font-semibold">
            My Workspace
          </Link>
        </div>

        {/* import/exp */}
        <div className="flexbox gap-2">
          <button className="px-2 py-1 text-xs rounded-sm  bg-accent2 font-semibold text-text">
            New
          </button>
          <button className="px-2 py-1 text-xs rounded-sm  bg-accent2 font-semibold text-text-secondary">
            Import
          </button>
        </div>
      </div>
      {/* sidebar */}
      <div className="flex w-full flex-1">
        <div className="w-20  border-r border-accent2 p-1 flex justify-between flex-col">
          {/* menu */}
          <div className="flex flex-col gap-1 bborder h-fit pb-3 border-accent2">
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                className={`flex flex-col justify-center items-center gap-1 p-2 rounded-sm text-text hover:bg-accent2 ${
                  index === 0 && "bg-accent2"
                }`}
              >
                <menuItem.Icon />
                <span className="text-[10px]">{menuItem.name}</span>
              </button>
            ))}
          </div>
          {/* middle */}
          <div className="flex-1 flex flex-col pt-2 ">
            <button
              className={`flex flex-col justify-center items-center gap-1 p-2 rounded-sm text-text hover:bg-accent2  h-[52px]
              }`}
            >
              <SquaresFourIcon />
            </button>
          </div>
          {/* below extras */}
          <div className="flex flex-col">
            <button
              className={`flex flex-col justify-center items-center gap-1 p-2 rounded-sm text-text hover:bg-accent2
              }`}
            >
              <FolderIcon />
              <span className=" text-[10px]">Files</span>
              <span className=" text-[10px] px-1 border border-dblue text-dblue font-semibold rounded-xs">
                BETA
              </span>
            </button>
          </div>
        </div>

        <div
          //   className=" flex-1 resize-x min-w-[300px]"
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-accent2"
          onMouseDown={startResize}
        ></div>
      </div>
    </aside>
  );
};

export default HomeSidebar;
