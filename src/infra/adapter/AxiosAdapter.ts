import axios from "axios";
import HttpClientInterface from "../../domain/http/HttpClient";
const BASE_URL = "https://sandbox.openfinance.celcoin.dev/v5";

export default class AxiosAdapter implements HttpClientInterface {
  headers = { "Content-Type": "application/json" };

  async get(url: string, query?: {}, headers?: {}): Promise<any> {
    url = `${BASE_URL}${url}`;
    const response = await axios.get(url, { params: query, headers });
    return response.data;
  }

  async post(url: string, data: any, headers?: {}): Promise<any> {
    url = `${BASE_URL}${url}`;
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
    url = `${BASE_URL}${url}`;
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

  async authorize(id: string): Promise<string> {
    const data = {
      client_id: id,
      grant_type: "client_credentials",
      client_secret: "e9d15cde33024c1494de7480e69b7a18c09d7cd25a8446839b3be82a56a044a3",
    };
    const options = this.parseAuthorizeOptions("POST", "/token", data);
    const response = await axios.request(options);
    const { access_token: token } = response.data;
    return token;
  }

  private parseAuthorizeOptions(method: string, url: string, data: any, headers?: any) {
    const boundary = "---011000010111000001101001";
    url = `${BASE_URL}${url}`;
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
