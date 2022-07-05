export default interface MiddlewareInterface {
  setNext(handler: any): any;
  handle(query: any, body: any, headers?: any): any;
}
