import {
  BellIcon,
  CaretDownIcon,
  GearIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import Btn from "./Btn";
import Avatar from "./Avatar";
import MultiBtn from "./MultiBtn";
import { HeaderSearchInput } from "./HeaderSearchInput";

function Header() {
  return (
    <header className=" bg-secondary w-full px-3 py-1.5 flex justify-between  items-center border-b border-accent2">
      <nav className="flexbox items-center gap-1 w-[320px]">
        <a
          className="text-text-tertiary text-sm hover:bg-accent2 rounded-sm transition p-2"
          href=""
        >
          Home
        </a>
        <div className="flexbox flex justify-center items-center rounded-sm transition p-2 hover:bg-accent2 gap-2">
          <a className="text-text-tertiary text-sm" href="">
            Workspaces
          </a>
          <Btn className="" icon={<CaretDownIcon />} />
        </div>
        <a
          className="text-text-tertiary text-sm hover:bg-accent2 rounded-sm transition p-2"
          href=""
        >
          API Network
        </a>
      </nav>
      <HeaderSearchInput />
      <div className="flexbox justify-between w-[286px] pl-1 gap-3">
        <button className=" bg-dblue py-1 px-2 font-semibold rounded-sm flex items-center justify-center text-white text-xs gap-0.5">
          <UserPlusIcon />
          <span>Invite</span>
        </button>
        <div className="flexbox gap-5 flex-1 justify-end">
          <Btn icon={<GearIcon className=" text-text-tertiary" />} />
          <Btn icon={<BellIcon className=" text-text-tertiary" />} />
          <Avatar />
        </div>
        <MultiBtn title="Upgrade" className=" bg-accent" />
      </div>
    </header>
  );
}

export default Header;
