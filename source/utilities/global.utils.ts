/**
 * Converts an IHttpOptions object to an array of query parameters
 * @param options
 */
export const recordToParams = (
  record: Record<string, any>,
  params: string[] = [],
  path = "",
  isRoot = true
): string[] => {
  for (let [key, value] of Object.entries(record)) {
    let field = key;
    if (!isRoot) {
      field = `[${field}]`;
    }
    const _path = path + field;

    if (Array.isArray(value)) {
      // add each item to the params if the value is an array
      value = [...value].sort();
      for (const item of value) {
        if (typeof value === "object") {
          recordToParams(value, params, _path, false);
        } else {
          params.push(`${_path}[]=${encodeURIComponent(item)}`);
        }
      }
    } else if (value && typeof value === "object") {
      // allow nested fields
      recordToParams(value, params, _path, false);
    } else {
      params.push(`${_path}=${encodeURIComponent(value)}`);
    }
  }

  return params.sort();
};
