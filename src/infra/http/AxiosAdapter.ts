import axios from "axios";
import env from "../../../env";
import HttpClientInterface from "./client/Client";

export default class AxiosAdapter implements HttpClientInterface {
  async get(url: string, query?: {}, headers?: {}): Promise<any> {
    const response = await axios.get(url, { params: query, headers });
    return response.data;
  }

  async post(url: string, data: any, headers?: {}): Promise<any> {
    const options = {
      method: "POST",
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data,
    };
    const response = await axios.request(options);
    return response.data;
  }

  async put(url: string, data: any, headers?: {}): Promise<any> {
    const options = {
      method: "PUT",
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data,
    };
    const response = await axios.request(options);
    return response.data;
  }

  async authorize(id: string, url: string): Promise<string> {
    const data = {
      client_id: id,
      grant_type: "client_credentials",
      client_secret: env.CELLCOIN_SECRET,
    };
    const options = this.parseAuthorizeOptions("POST", url, data);
    const response = await axios.request(options);
    const { access_token: token } = response.data;
    return token;
  }

  private parseAuthorizeOptions(method: string, url: string, data: any, headers?: any) {
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
