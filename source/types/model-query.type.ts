import { QueryOperators } from "./query-operators.type";

export type ModelQuery<ModelType = any> =
  | {
      [key in keyof ModelType]?: Partial<Record<QueryOperators, any>>;
    }
  | { [key: string]: Partial<Record<QueryOperators, any>> };
