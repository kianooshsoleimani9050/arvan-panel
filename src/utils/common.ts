import { ComponentType, lazy } from "react";
import type { NestedRouteObject } from "../@types/common.model";

export const lazyRetry = function (
  componentImport: () => Promise<{
    default: ComponentType<any>;
  }>,
) {
  return new Promise<{ default: ComponentType<any> }>((resolve, reject) => {
    // check if the window has already been refreshed
    const key = "retry-lazy-refreshed";
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem(key) || "false",
    );
    // try to import the component
    componentImport()
      .then((component) => {
        window.sessionStorage.setItem(key, "false"); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem(key, "true"); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        reject(error); // Default error behaviour as already tried refresh
      });
  });
};

export const lazyRetryHandler = (
  componentImport: () => Promise<{
    default: ComponentType<any>;
  }>,
) => lazy(() => lazyRetry(componentImport));

const removeAdditionalSlashes = (path: string) => path.replace(/\/+/gi, "/");

export const getAbsoluteRoute = (obj: NestedRouteObject, base = "") => {
  const newobj: NestedRouteObject = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      newobj[key] = getAbsoluteRoute(
        obj[key],
        removeAdditionalSlashes(`${base}/${obj.BASE}`),
      );
    } else if (typeof obj[key] === "string") {
      let value;
      if (key === "BASE") {
        value = obj[key] === "/" ? "/" : `/${base}/${obj[key]}`;
      } else {
        value = `/${base}/${obj.BASE}/${obj[key]}`;
      }
      newobj[key] = removeAdditionalSlashes(value);
    }
  });
  return newobj;
};

export const paginationRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const wordsSelector = (data: string, count: number): string =>
  data.split(" ").slice(0, count).join(" ");
