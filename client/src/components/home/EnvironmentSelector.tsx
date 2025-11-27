import { CaretDownIcon, SquareLogoIcon } from "@phosphor-icons/react";
import Btn from "../global/Btn";

const EnvironmentSelector = () => {
  return (
    <div className="p-1 w-[168px] h-10">
      <div
        className="w-full h-full p-1 justify-between hover:bg-accent2 rounded-sm flexbox cursor-pointer text-text-tertiary hover:text-text"
        aria-label="Select environment"
      >
        <div className=" flexbox gap-2">
          <SquareLogoIcon />
          <span className="text-xs">No environment</span>
        </div>
        <Btn icon={<CaretDownIcon />} />
      </div>
    </div>
  );
};

export default EnvironmentSelector;
