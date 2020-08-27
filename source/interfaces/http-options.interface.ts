export interface IHttpOptions<Model = any> {
  sort?: string[];
  filter?:
    | {
        [key in keyof Model]: string | number | boolean;
      }
    | { [key: string]: string | number | boolean };
  offset?: number;
  limit?: number;
  pick?: string[];
  search?: string;
  searchScope?: string[];
  populate?: string[];
  distinct?: string;
  random?: boolean;

  [customParam: string]: any;
}
