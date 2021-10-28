/**
 * Escape all regex symbols in a string. Could be used for escaping user input.
 * Escapes: .*+?^${}()|[]\
 * @param str
 * @returns
 */
export const escapeRegexSymbols = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
