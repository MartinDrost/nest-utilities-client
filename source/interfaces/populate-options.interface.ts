import { IHttpOptions } from "./http-options.interface";

export interface IPopulateOptions<ModelType = any>
  extends Omit<IHttpOptions<ModelType>, "random" | "distinct" | "search"> {
  path: string;
  populate?: IPopulateOptions<ModelType>[];
}
