import OutputDTO from "../../dto/OutputDTO";

export default interface HttpClientInterface {
  authorize(id: string, url: string): Promise<OutputDTO>;
  get(url: string, query?: {}, headers?: {}): Promise<OutputDTO>;
  post(url: string, body: any, headers?: {}): Promise<OutputDTO>;
  put(url: string, body: any, headers?: {}): Promise<OutputDTO>;
}
