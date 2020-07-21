import { IHttpOptions, IResponse } from "../interfaces";
import { SimpleHttpService } from "./http.abstract.service";

export abstract class CrudService<IModel> {
  /**
   * Constructor
   * @param controller The url pointing to the services' controller
   * @param http An HttpService implementation which will be used
   */
  constructor(
    protected controller: string,
    protected http = new SimpleHttpService()
  ) {}

  /**
   * Create a new instance of the given body.
   * @param body
   */
  post(body: IModel | FormData): Promise<IResponse<IModel>> {
    return this.http.post(this.controller, body);
  }

  /**
   * Get a model by its id.
   * @param id
   * @param options
   */
  async get(
    id: string,
    options?: IHttpOptions<IModel>
  ): Promise<IResponse<IModel>> {
    // default to a 404 if no id was given
    if (!id) {
      throw new Response(null, { status: 404 });
    }

    return this.http.get([this.controller, id].join("/"), options);
  }

  /**
   * Get multiple models by their id.
   * @param ids
   * @param options
   */
  getMany(
    ids: string[],
    options?: IHttpOptions<IModel>
  ): Promise<IResponse<IModel[]>> {
    return this.http.get(
      [this.controller, "many", ids.join(",")].join("/"),
      options
    );
  }

  /**
   * Get all models.
   * @param options
   */
  getAll(options?: IHttpOptions<IModel>): Promise<IResponse<IModel[]>> {
    return this.http.get(this.controller, options);
  }

  /**
   * Overwrite the instance of the given model with the provided body.
   * The model to overwrite is defined with by the (_)id in the body object.
   * @param body
   */
  put(body: IModel | FormData): Promise<IResponse<IModel>> {
    return this.http.put(this.controller, body);
  }

  /**
   * Merge the provided body with the instance of the given model in the DB.
   * The model to overwrite is defined with by the (_)id in the body object.
   * @param body
   */
  patch(body: Partial<IModel> | FormData): Promise<IResponse<IModel>> {
    return this.http.patch(this.controller, body);
  }

  /**
   * Delete a model by its id.
   * @param id
   */
  delete(id: string): Promise<IResponse<void>> {
    return this.http.delete([this.controller, id].join("/"));
  }
}
