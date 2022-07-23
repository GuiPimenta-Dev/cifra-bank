import axios from "axios";
import HttpError from "../../../application/error/HttpError";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";

export default class AxiosAdapter implements HttpClientInterface {
  async get(url: string, query?: {}, headers?: {}): Promise<OutputDTO> {
    let response: any;
    try {
      response = await axios.get(url, { params: query, headers });
    } catch (error: any) {
      throw new HttpError(error.response.status, error.response.data || error.response.statusText);
    }
    return { statusCode: response.status, data: response.data };
  }

  async post(url: string, body: any, headers?: {}): Promise<OutputDTO> {
    const options = {
      method: "POST",
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data: body,
    };
    let response: any;
    try {
      response = await axios.request(options);
    } catch (error: any) {
      throw new HttpError(error.response.status, error.response.data || error.response.statusText);
    }
    return { statusCode: response.status, data: response.data };
  }

  async put(url: string, body: any, headers?: {}): Promise<OutputDTO> {
    const options = {
      method: "PUT",
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data: body,
    };
    let response: any;
    try {
      response = await axios.request(options);
    } catch (error: any) {
      throw new HttpError(error.response.status, error.response.data || error.response.statusText);
    }
    return { statusCode: response.status, data: response.data };
  }
}
