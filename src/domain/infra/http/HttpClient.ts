import OutputDTO from "../../dto/application/OutputDTO";

export default interface HttpClientInterface {
  get(url: string, query?: {}, headers?: {}): Promise<OutputDTO>;
  post(url: string, body: any, headers?: {}): Promise<OutputDTO>;
  put(url: string, body: any, headers?: {}): Promise<OutputDTO>;
}
