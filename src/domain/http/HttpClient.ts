export default interface HttpClientInterface {
  get(url: string, query?: {}, headers?: {}): Promise<any>;
  post(url: string, data: any, headers?: {}): Promise<any>;
  put(url: string, data: any, headers?: {}): Promise<any>;
  authorize(id: string): Promise<string>;
}
