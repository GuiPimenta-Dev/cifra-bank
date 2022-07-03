export default interface ControllerInterface {
  handle(params?: any, body?: any, headers?: any): Promise<any>;
}
