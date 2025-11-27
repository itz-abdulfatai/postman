import type { BtnProps } from "../../../types";

function Btn({ icon, className, title }: BtnProps) {
  return (
    <button
      className={className}
      title={title}
      aria-label={title}
      type="button"
    >
      {icon}
    </button>
  );
}

export default Btn;
