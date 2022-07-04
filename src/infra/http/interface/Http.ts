export default interface HttpInterface {
  on(url: string, method: string, fn: any): void;
  listen(port: number): void;
}
