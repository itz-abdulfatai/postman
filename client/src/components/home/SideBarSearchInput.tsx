import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const SideBarSearchInput = () => {
  return (
    <div className="flexbox gap-2 rounded-sm gborder border-accent2  pl-3  flex-1 h-[25px]  cursor-pointer bg-primaryy">
      <label htmlFor="scollections" className="cursor-pointer">
        <MagnifyingGlassIcon className="text-text-tertiary text-base" />
      </label>
      <input
        type="text"
        id="scollections"
        placeholder="Search Collections"
        className="text-xs placeholder:text-xs text-text-tertiary flex-1"
      />

      {/* <div className="flex gap-2   ">
        <div className="p-0.5 text-text-tertiary bg-secondary rounded-sm text-xs">
          Ctrl
        </div>
        <div className="p-0.5 text-text-tertiary bg-secondary rounded-sm text-xs">
          k
        </div>
      </div> */}
    </div>
  );
};

export default SideBarSearchInput;
