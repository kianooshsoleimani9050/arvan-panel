import { generatePath } from "react-router";
import { getAbsoluteRoute } from "../utils/common";
// ----------------------------------------------------------------------
const ROOTS_AUTH = "/auth";
const ROOTS = "/";

export const PATH_AUTH = {
  BASE: ROOTS_AUTH,
  LOGIN: "login",
  REGISTER: "register",
};

export const PATH = {
  BASE: ROOTS,
  ARTICLE: {
    BASE: "articles",
    EDIT: "edit/:slug",
    ADD: "create",
    PAGE: "page/:page",
  },
};

export const createPath = (args: any) => {
  // Save some CPU power for routes without params
  if (args.hasOwnProperty("params") === false) return args.path;
  return generatePath(args.path, (args as any).params);
};

export const AUTH_ABSOLUTE_PATH = getAbsoluteRoute(
  PATH_AUTH,
) as typeof PATH_AUTH;

export const ABSOLUTE_PATH = getAbsoluteRoute(PATH) as typeof PATH;
