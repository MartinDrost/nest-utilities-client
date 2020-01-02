import { INuHeaders } from "./nu-headers.interface";

export interface IResponse<BodyType> extends Response {
  data: BodyType;
  headers: INuHeaders;
}
