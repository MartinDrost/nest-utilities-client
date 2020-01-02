import { IHttpOptions, IResponse } from "../interfaces";
import { optionsToParams } from "../utilities";

export abstract class HttpService {
  /**
   * Execute a fetch request
   * @param method
   * @param url
   * @param body
   * @param options
   */
  private async fetch<ResponseType = any>(
    method: string,
    url: string,
    body: any,
    options?: IHttpOptions
  ): Promise<IResponse<ResponseType>> {
    const init: RequestInit = {
      method,
      body,
      headers: {}
    };

    // convert the httpOptions to query parameters
    const queryParams = optionsToParams(options || {}).join("&");
    const requestUrl = [url, queryParams].join("?");

    // set the base headers
    init.headers = this.getHeaders(requestUrl, init);

    // define the type of request
    if (typeof body === "object" && body instanceof FormData === false) {
      init.headers!["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    // construct and execute the request
    try {
      const response: IResponse<ResponseType> = {
        ...(await fetch(requestUrl, init)),
        data: undefined as any
      };

      // store the actual outcome in response.data
      const dataString = await response.text();
      try {
        response.data = JSON.parse(dataString);
      } catch {
        // catch empty and string responses
        response.data = (dataString || undefined) as any;
      }

      // forward error responses
      if (response.status >= 400) {
        throw response;
      }

      return response;
    } catch (error) {
      this.onRequestError(error);

      throw error;
    }
  }

  /**
   * Execute a POST request.
   * @param url
   * @param body
   */
  post<ResponseType = any>(
    url: string,
    body: any
  ): Promise<IResponse<ResponseType>> {
    return this.fetch("POST", url, body);
  }

  /**
   * Execute a GET request.
   * @param url
   * @param options
   */
  get<ResponseType = any>(
    url: string,
    options?: IHttpOptions
  ): Promise<IResponse<ResponseType>> {
    return this.fetch("GET", url, null, options);
  }

  /**
   * Execute a PUT request.
   * @param url
   * @param body
   */
  put<ResponseType = any>(
    url: string,
    body: any
  ): Promise<IResponse<ResponseType>> {
    return this.fetch("PUT", url, body);
  }

  /**
   * Execute a PATCH request.
   * @param url
   * @param body
   */
  patch<ResponseType = any>(
    url: string,
    body: any
  ): Promise<IResponse<ResponseType>> {
    return this.fetch("PATCH", url, body);
  }

  /**
   * Execute a DELETE request
   * @param url
   */
  delete<ResponseType = void>(url: string): Promise<IResponse<ResponseType>> {
    return this.fetch("DELETE", url, null);
  }

  /**
   * Return the required headers for a request.
   * @param url
   * @param init
   */
  abstract getHeaders(
    url: string,
    init: RequestInit
  ): { [header: string]: string };

  /**
   * Handle intercepted errors.
   * @param error
   */
  abstract onRequestError(error: IResponse<any>): void;
}

/**
 * A basic HttpService used as example and out of the box usage.
 */
export class SimpleHttpService extends HttpService {
  getHeaders(url: string, init: RequestInit) {
    return {};
  }

  onRequestError(error: IResponse<any>) {}
}
