export default interface MiddlewareInterface {
  handle(query: any, body: any, headers: any): any;
}
