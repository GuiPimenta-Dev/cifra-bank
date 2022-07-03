export default interface HttpClientInterface {
  authorize(id: string, url: string): Promise<string>;
  get(url: string, query?: {}, headers?: {}): Promise<any>;
  post(url: string, data: any, headers?: {}): Promise<any>;
  put(url: string, data: any, headers?: {}): Promise<any>;
}
