import { QueryOperators } from "./query-operators.type";

export type ModelQuery<ModelType = any> =
  | {
      [key in keyof ModelType]?:
        | Record<QueryOperators, any>
        | ModelQuery<ModelType>[]
        | any;
    }
  | {
      [key: string]:
        | Record<QueryOperators, any>
        | ModelQuery<ModelType>[]
        | any;
    };
