import type { BtnProps } from "../../../types";

function Btn({ icon, className }: BtnProps) {
  return <button className={className}>{icon}</button>;
}

export default Btn;
