import OutputDTO from "../../../../src/dto/application/OutputDTO";
import HttpClientInterface from "../../../../src/domain/infra/http/HttpClient";

export default class FakeHttpClient implements HttpClientInterface {
  private getResponse: any;
  private postResponse: any;
  private putResponse: any;

  async get(url: string, query?: {} | undefined, headers?: {} | undefined): Promise<OutputDTO> {
    return this.getResponse;
  }

  async post(url: string, body: any, headers?: {} | undefined): Promise<OutputDTO> {
    return this.postResponse;
  }

  async put(url: string, body: any, headers?: {} | undefined): Promise<OutputDTO> {
    return this.putResponse;
  }

  mockGet(input: any): void {
    this.getResponse = {
      statusCode: 200,
      data: input,
    };
  }

  mockPost(input: any): void {
    this.postResponse = {
      statusCode: 200,
      data: input,
    };
  }

  mockPut(input: any): void {
    this.putResponse = {
      statusCode: 200,
      data: input,
    };
  }
}
