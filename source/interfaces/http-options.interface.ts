import { ModelQuery } from "../types/model-query.type";

export interface IHttpOptions<ModelType = any> {
  filter?: ModelQuery<ModelType>;
  search?: ModelQuery<ModelType>;
  sort?: string[];
  offset?: number;
  limit?: number;
  select?: string[];
  populate?: string[];
  distinct?: string;
  random?: boolean;

  [key: string]: any;
}
