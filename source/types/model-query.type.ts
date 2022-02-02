import { QueryOperators } from "./query-operators.type";

/**
 * Typings used to describe the options which can be sent when querying a model.
 */
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
