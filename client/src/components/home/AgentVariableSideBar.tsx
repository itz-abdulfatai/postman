import { PlusIcon } from "@phosphor-icons/react";
import Btn from "../global/Btn";
import { Agent } from "../../assets/images";

const AgentVariableSideBar = () => {
  return (
    <div className="w-[47px] border border-accent2 flex items-stretch">
      <div className="flex flex-col justify-between p-3">
        <div className="flex-1 flex flex-col gap-3">
          <Btn icon={<PlusIcon />} />
        </div>
        <Btn
          icon={<img src={Agent} alt="Agent" className="w-4.5 aspect-square" />}
        />
      </div>
    </div>
  );
};

export default AgentVariableSideBar;
