import OutputDTO from "../../../../src/domain/dto/OutputDTO";
import HttpClientInterface from "../../../../src/domain/infra/http/HttpClient";

export default class FakeHttpClient implements HttpClientInterface {
  private authorizeResponse: any;
  private getResponse: any;
  private postResponse: any;
  private putResponse: any;

  async authorize(id: string, url: string): Promise<OutputDTO> {
    return this.authorizeResponse;
  }

  async get(url: string, query?: {} | undefined, headers?: {} | undefined): Promise<OutputDTO> {
    return this.getResponse;
  }

  async post(url: string, body: any, headers?: {} | undefined): Promise<OutputDTO> {
    return this.postResponse;
  }

  async put(url: string, body: any, headers?: {} | undefined): Promise<OutputDTO> {
    return this.putResponse;
  }

  mockAuthorize(input: any): void {
    this.authorizeResponse = {
      statusCode: 200,
      data: input,
    };
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
