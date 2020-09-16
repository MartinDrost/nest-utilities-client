import { QueryOperators } from "./query-operators.type";

export type ModelQuery<ModelType = any> = Partial<
  Record<string | keyof ModelType, Partial<Record<QueryOperators, any>>>
>;
