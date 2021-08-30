import { INuHeaders } from "./nu-headers.interface";

export interface IResponse<BodyType, HydratedType = null> extends Response {
  data: BodyType;
  hydrated: HydratedType;
  headers: INuHeaders;
}
