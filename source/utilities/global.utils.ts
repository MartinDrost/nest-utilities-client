import { IHttpOptions } from "../interfaces";

/**
 * Converts an IHttpOptions object to an array of query parameters
 * @param options
 */
export const optionsToParams = (options: IHttpOptions) => {
  let queryParams: string[] = [];
  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        // support array options
        queryParams.push(`${key}=${value.join(",")}`);
      } else {
        // support subobjects
        queryParams = queryParams.concat(
          Object.keys(value).map(
            (subKey) => `${key}[${subKey}]=${value[subKey]}`
          )
        );
      }
    } else {
      // support normal values
      queryParams.push(`${key}=${value}`);
    }
  });

  return queryParams;
};

/**
 * Stores options in the history state
 * @param options
 */
export const optionsToUrl = (options: IHttpOptions): void => {
  history.replaceState(
    null,
    document.title,
    "?" + optionsToParams(options).join("&")
  );
};

/**
 * Retrieves options from the history state
 */
export const optionsFromUrl = (): IHttpOptions => {
  const options: IHttpOptions = {};
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, key) => {
    if (key.includes("[")) {
      // support nested options
      const path = key.replace(/\]/g, "").split("[");
      key = path.splice(0, 1)[0];

      if (parseOptions[key]) {
        options[key] = options[key] || {};
        options[key][path.join(".")] = parseOptions[key](value);
      }
    } else {
      if (parseOptions[key]) {
        options[key] = parseOptions[key](value);
      }
    }
  });

  return options;
};

/**
 * Methods to parse each option field from a string
 */
export const parseOptions: Record<
  keyof IHttpOptions,
  (value: string) => any
> = {
  distinct: (value) => value,
  filter: (value) => value,
  limit: (value) => +value,
  offset: (value) => +value,
  pick: (value) => value.split(","),
  populate: (value) => value.split(","),
  random: (value) => !!eval(value),
  search: (value) => value,
  searchScope: (value) => value.split(","),
  sort: (value) => value.split(","),
};
