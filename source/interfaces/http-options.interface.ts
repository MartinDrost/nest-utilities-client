import { ModelQuery } from "../types/model-query.type";

export interface IHttpOptions<ModelType = any> {
  filter?: ModelQuery<ModelType>;
  search?: ModelQuery<ModelType>;
  sort?: string[];
  offset?: string;
  limit?: string;
  select?: string[];
  populate?: string[];
  distinct?: string;
  random?: string;
}
