import type { RequestItem } from "../../types";

export const getMethodColor = (request: RequestItem) => {
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
