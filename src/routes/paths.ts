import { generatePath } from "react-router";
import { getAbsoluteRoute } from "../utils/common";
// ----------------------------------------------------------------------
const ROOTS = "/";

export const PATH = {
  BASE: ROOTS,
  DASHBOARD: "dashboard",
};

export const createPath = (args: any) => {
  // Save some CPU power for routes without params
  if (args.hasOwnProperty("params") === false) return args.path;
  return generatePath(args.path, (args as any).params);
};

export const ABSOLUTE_PATH = getAbsoluteRoute(PATH) as typeof PATH;
