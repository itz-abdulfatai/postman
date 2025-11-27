import type { RequestItemProps } from "../../../types";

const RequestItem = ({ request, isActive, onClick }: RequestItemProps) => {
  const getMethodColor = () => {
    switch (request.method) {
      case "GET":
        return "text-green";

        break;
      case "POST":
        return " text-yellow";

        break;
      case "PUT":
        return "text-fuchsia-800";

        break;
      case "DELETE":
        return "text-brown";

        break;
      case "HEAD":
        return "text-fuchsia-800";

        break;
      case "OPTIONS":
        return "text-fuchsia-800";

        break;
      case "PATCH":
        return "text-fuchsia-800";

        break;
    }
  };
  return (
    <button
      onClick={onClick}
      className={` w-full pl-[50px] pr-3.5 py-[5.3px]  flexbox justify-between text-text-tertiary text-xs group  ${
        isActive
          ? "bg-accent2 border-accent2 "
          : "hover:bg-accent2-fade hover:border-accent2-fade border-secondary"
      } `}
    >
      <div className="flexbox gap-1">
        <span className={`text-[9px] font-semibold ${getMethodColor()}`}>
          {request.method === "DELETE" ? "DEL" : request.method}
        </span>
        <span>{request.name}</span>
      </div>
    </button>
  );
};

export default RequestItem;
