import { IHttpOptions, IResponse } from "../interfaces";
import { ManyPayload } from "../types";
import { SimpleHttpService } from "./http.abstract.service";

export abstract class CrudService<ModelType, HydratedType = null> {
  /**
   * Constructor
   * @param controller The url pointing to the services' controller
   * @param http An HttpService implementation which will be used
   */
  constructor(
    public controller: string,
    protected http = new SimpleHttpService()
  ) {}

  /**
   * Create a new instance of the given body.
   * @param body the object which you want to create
   */
  post = async (
    body: ModelType | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType, HydratedType>> => {
    const response = await this.http.post(this.controller, body, options);
    response.hydrated = await this.hydrate(response.data);

    return response;
  };

  /**
   * Create a new instances of the given bodies.
   * @param body the objects which you want to create
   */
  postMany = async (
    body: ManyPayload<ModelType> | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType[], HydratedType[]>> => {
    const response = await this.http.post(
      [this.controller, "many"].join("/"),
      body,
      options
    );
    response.hydrated = await Promise.all(
      response.data.map((model) => this.hydrate(model))
    );

    return response;
  };

  /**
   * Get a model by its id.
   * @param id the id of the model to get
   * @param options
   */
  get = async (
    id: string,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType, HydratedType>> => {
    const response = await this.http.get(
      [this.controller, id].join("/"),
      options
    );
    response.hydrated = await this.hydrate(response.data);

    return response;
  };

  /**
   * Get multiple models by their id.
   * @param ids the ids of the models to get
   * @param options
   */
  getMany = async (
    ids: string[],
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType[], HydratedType[]>> => {
    const response = await this.http.get<any[]>(this.controller, {
      ...options,
      match: { ...options.match, _id: { $in: ids } },
    });

    // sort the results in the order of the ids array
    const resultMap: Record<string, ModelType> = response.data.reduce(
      (prev, curr) => {
        prev[curr._id] = curr;
        return prev;
      },
      {}
    );
    response.data = ids.map((_id) => resultMap[_id]).filter(Boolean);

    // hydrate the responses
    response.hydrated = await Promise.all(
      response.data.map((model) => this.hydrate(model))
    );

    return response;
  };

  /**
   * Get all models.
   * @param options
   */
  getAll = async (
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType[], HydratedType[]>> => {
    const response = await this.http.get(this.controller, options);
    response.hydrated = await Promise.all(
      response.data.map((model) => this.hydrate(model))
    );

    return response;
  };

  /**
   * Count the number of results
   * @param options
   */
  count = async (options: IHttpOptions<ModelType> = {}): Promise<Number> => {
    const response = await this.http.get(this.controller, {
      ...options,
      limit: 1,
    });

    return +(response.headers.get("X-Total-Count") ?? 0);
  };

  /**
   * Overwrite the instance of the given model with the provided body.
   * The model to overwrite is defined with by the (_)id in the body object.
   * @param body the object which you want to overwrite
   */
  put = async (
    body: ModelType | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType, HydratedType>> => {
    const response = await this.http.put(this.controller, body, options);
    response.hydrated = await this.hydrate(response.data);

    return response;
  };

  /**
   * Overwrite the instances of the given models with the provided bodies.
   * The models to overwrite are defined with by the (_)id in the body objects.
   * @param body the objects which you want to overwrite
   */
  putMany = async (
    body: ManyPayload<ModelType> | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType[], HydratedType[]>> => {
    const response = await this.http.put(
      [this.controller, "many"].join("/"),
      body,
      options
    );
    response.hydrated = await Promise.all(
      response.data.map((model) => this.hydrate(model))
    );

    return response;
  };

  /**
   * Merge the provided body with the instance of the given model in the DB.
   * The model to overwrite is defined with by the (_)id in the body object.
   * @param body the object which you want to use to merge with the model
   */
  patch = async (
    body: Partial<ModelType> | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType, HydratedType>> => {
    const response = await this.http.patch(this.controller, body, options);
    response.hydrated = await this.hydrate(response.data);

    return response;
  };

  /**
   * Merge the provided bodies with the instances of the given models in the DB.
   * The models to overwrite are defined with by the (_)id in the body objects.
   * @param body the objects which you want to use to merge with the models
   */
  patchMany = async (
    body: ManyPayload<Partial<ModelType>> | FormData,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType[], HydratedType[]>> => {
    const response = await this.http.patch(
      [this.controller, "many"].join("/"),
      body,
      options
    );
    response.hydrated = await Promise.all(
      response.data.map((model) => this.hydrate(model))
    );

    return response;
  };

  /**
   * Delete a model by its id.
   * @param id the id of the model to delete
   */
  delete = async (
    id: string,
    options: IHttpOptions<ModelType> = {}
  ): Promise<IResponse<ModelType, HydratedType>> => {
    const response = await this.http.delete(
      [this.controller, id].join("/"),
      options
    );
    response.hydrated = await this.hydrate(response.data);

    return response;
  };

  /**
   * Overridable method used to hydrate response objects. This method is
   * called after the basic CRUD methods by default and can be implemented in
   * custom methods.
   *
   * Example scenario: Transforming JSON responses to class instances
   * @param model
   * @returns
   */
  hydrate = async (model: ModelType): Promise<HydratedType> => {
    return null as any;
  };
}
