export default interface ControllerInterface {
  handle(params?: any, body?: any): Promise<any>;
}
