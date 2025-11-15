import { CaretDownIcon } from "@phosphor-icons/react";
import type { MultiBtnProps } from "../../../types";

function MultiBtn({ className, title }: MultiBtnProps) {
  return (
    <div className={className + " w-24 flex text-white rounded-sm"}>
      <button className=" flex-1 py-2 text-xs border-r border-r-text-tertiary px-2 cursor-pointer hover:bg-accent-dark rounded-l-sm font-semibold">
        {title}
      </button>
      <button className="py-1 px-1.5 hover:bg-accent-dark rounded-r-sm">
        <CaretDownIcon />
      </button>
    </div>
  );
}

export default MultiBtn;
