import { IHttpOptions } from "../interfaces";

/**
 * Converts an IHttpOptions object to an array of query parameters
 * @param options
 */

// todo: recursive function
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
