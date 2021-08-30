import { ModelQuery } from "../types/model-query.type";
import { IPopulateOptions } from "./populate-options.interface";

export interface IHttpOptions<ModelType = any> {
  match?: ModelQuery<ModelType>;
  sort?: string[];
  offset?: number;
  limit?: number;
  select?: string[];
  populate?: (string | IPopulateOptions)[];
  distinct?: string;
  random?: boolean;

  [key: string]: any;
}
