export default interface HttpInterface {
  on(url: string, method: string, fn: any, authorize?: boolean): void;
  listen(port: number): void;
}
