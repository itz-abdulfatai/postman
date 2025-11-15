import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export const SearchInput = () => {
  return (
    <div className="flexbox gap-1 items-center justify-between rounded-sm gborder border-accent2 p-2 w-60 h-[34px] -translate-x-4  cursor-pointer bg-primary">
      <div className="flexbox gap-1 items-center">
        <MagnifyingGlassIcon className="text-text-tertiary text-lg" />
        <span className="text-sm text-text-tertiary">Search Postman</span>
      </div>

      <div className="flex gap-2   ">
        <div className="p-0.5 text-text-tertiary bg-secondary rounded-sm text-xs">
          Ctrl
        </div>
        <div className="p-0.5 text-text-tertiary bg-secondary rounded-sm text-xs">
          k
        </div>
      </div>
    </div>
  );
};
