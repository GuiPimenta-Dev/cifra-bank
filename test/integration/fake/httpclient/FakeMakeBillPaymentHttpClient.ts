import HttpClientInterface from "../../../../src/infra/http/client/Client";

export default class FakeMakeBillPaymentHttpClient implements HttpClientInterface {
  authorize(id: string, url: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  get(url: string, query?: {} | undefined, headers?: {} | undefined): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async post(url: string, data: any, headers?: {} | undefined): Promise<any> {
    return { receipt: "fake-receipt" };
  }

  async put(url: string, data: any, headers?: {} | undefined): Promise<any> {
    return;
  }
}
