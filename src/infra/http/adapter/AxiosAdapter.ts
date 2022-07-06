import axios from "axios";
import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpError from "../../../application/error/HttpError";
import HttpClientInterface from "../../../interface/infra/http/HttpClient";

export default class AxiosAdapter implements HttpClientInterface {
  async get(url: string, query?: {}, headers?: {}): Promise<OutputDTO> {
    let response: any;
    try {
      response = await axios.get(url, { params: query, headers });
    } catch (error: any) {
      throw new HttpError(error.response.status, error.response.data.message);
    }
    return { statusCode: response.status, data: response.data };
  }

  async post(url: string, body: any, headers?: {}): Promise<any> {
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
      throw new HttpError(error.response.status, error.response.data.message);
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
      throw new HttpError(error.response.status, error.response.data.message);
    }
    return { statusCode: response.status, data: response.data };
  }

  async authorize(id: string, url: string): Promise<any> {
    const body = {
      client_id: id,
      grant_type: "client_credentials",
      client_secret: env.CELLCOIN_SECRET,
    };
    let response: any;
    try {
      const options = await this.parseAuthorizeOptions("POST", url, body);
      response = await axios.request(options);
    } catch (error: any) {
      throw new HttpError(error.response.status, error.response.data.message);
    }
    const { access_token: token } = response.data;
    return { statusCode: response.status, data: token };
  }

  private async parseAuthorizeOptions(method: string, url: string, data: any, headers?: any) {
    const boundary = "---011000010111000001101001";
    let parsedData = "";
    for (let key in data) {
      parsedData += `--${boundary}\r\n`;
      parsedData += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
      parsedData += `${data[key]}\r\n`;
    }
    parsedData += `--${boundary}--\r\n`;
    const options = {
      method: method,
      url,
      headers: { ...headers, "content-type": `multipart/form-data; boundary=${boundary}` },
      data: parsedData,
    };

    return options;
  }
}
