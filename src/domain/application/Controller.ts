export default interface ControllerInterface {
  handle(query: any, body: any): Promise<any>;
}
