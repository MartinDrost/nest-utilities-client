import { QueryOperators } from "../types/query-operators.type";

export interface IHttpOptions<ModelType = any> {
  filter?: Record<string | keyof ModelType, Record<QueryOperators, any>>;
  search?: Record<string | keyof ModelType, Record<QueryOperators, any>>;
  sort?: string[];
  offset?: string;
  limit?: string;
  select?: string[];
  populate?: string[];
  distinct?: string;
  random?: string;
}
