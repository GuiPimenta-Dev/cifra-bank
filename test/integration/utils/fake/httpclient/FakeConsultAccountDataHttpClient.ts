import OutputDTO from "../../../../../src/application/dto/OutputDTO";
import HttpClientInterface from "../../../../../src/interface/infra/http/HttpClient";

export default class FakeConsultAccountDataHttpClient implements HttpClientInterface {
  authorize(id: string, url: string): Promise<OutputDTO> {
    throw new Error("Method not implemented.");
  }

  get(url: string, query?: {} | undefined, headers?: {} | undefined): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async post(url: string, data: any, headers?: {} | undefined): Promise<any> {
    return { statusCode: 200, data: { value: 77.55, transactionId: 123456789 } };
  }

  async put(url: string, data: any, headers?: {} | undefined): Promise<any> {
    return;
  }
}