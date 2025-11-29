import { CaretDownIcon, SquareLogoIcon } from "@phosphor-icons/react";

const EnvironmentSelector = () => {
  return (
    <div className="p-1  w-[168px] h-[39px] border-l border-b border-accent2">
      <button
        className="w-full h-full py-1 px-2 justify-between hover:bg-accent2 rounded-sm flexbox cursor-pointer text-text-tertiary hover:text-text"
        aria-label="Select environment"
      >
        <div className=" flexbox gap-3">
          <SquareLogoIcon />
          <span className="text-xs">No environment</span>
        </div>
        <CaretDownIcon />
      </button>
    </div>
  );
};

export default EnvironmentSelector;
