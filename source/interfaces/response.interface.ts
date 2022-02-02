export interface IResponse<BodyType, HydratedType = null> extends Response {
  /**
   * The json body of the response.
   */
  data: BodyType;

  /**
   * The hydrated body of the response.
   * This is the same as data but is hydrated using the hydrate method
   * in the CrudController.
   */
  hydrated: HydratedType;
}
