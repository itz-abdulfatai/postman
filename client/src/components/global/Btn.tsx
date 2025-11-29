import type { BtnProps } from "../../../types";

function Btn({ icon, className, title, onClick }: BtnProps) {
  return (
    <button
      className={className}
      title={title}
      aria-label={title}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
}

export default Btn;
