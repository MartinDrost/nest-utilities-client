export interface IResponse<BodyType> extends Response {
  data?: BodyType;
}
