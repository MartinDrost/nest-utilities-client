/**
 * Type used for requests which alter many models
 */
export type ManyPayload<ModelType> = {
  /**
   * The models to alter
   */
  payload: ModelType[];
};
