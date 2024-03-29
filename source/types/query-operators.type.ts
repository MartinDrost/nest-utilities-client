/**
 * Supported mongodb query operators.
 */
export type QueryOperators =
  | "$eq"
  | "$ne"
  | "$lt"
  | "$lte"
  | "$gt"
  | "$gte"
  | "$all"
  | "$in"
  | "$nin"
  | "$exists"
  | "$size"
  | "$and"
  | "$or"
  | "$not"
  | "$regex"
  | "$options"
  | "$isNull";
