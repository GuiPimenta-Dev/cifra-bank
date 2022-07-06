import axios from "axios";
import env from "../../../../env";
import OutputDTO from "../../../application/dto/OutputDTO";
import HttpError from "../../../application/error/HttpError";
import HttpClientInterface from "../interface/HttpClient";

export default class AxiosAdapter implements HttpClientInterface {
  async get(url: string, query?: {}, headers?: {}): Promise<OutputDTO> {
    const { status: statusCode, data, statusText: message } = await axios.get(url, { params: query, headers });
    if (statusCode > 299) throw new HttpError(statusCode, message);
    return { statusCode, data };
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
    const { status: statusCode, data, statusText: message } = await axios.request(options);
    if (statusCode > 299) throw new HttpError(statusCode, message);
    return { statusCode, data };
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
    const { status: statusCode, data, statusText: message } = await axios.request(options);
    if (statusCode > 299) throw new HttpError(statusCode, message);
    return { statusCode, data };
  }

  async authorize(id: string, url: string): Promise<any> {
    const body = {
      client_id: id,
      grant_type: "client_credentials",
      client_secret: env.CELLCOIN_SECRET,
    };
    const options = await this.parseAuthorizeOptions("POST", url, body);
    const { status: statusCode, data, statusText: message } = await axios.request(options);
    if (statusCode > 299) throw new HttpError(statusCode, message);
    const { access_token: token } = data;
    return { statusCode, data: token, message };
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
