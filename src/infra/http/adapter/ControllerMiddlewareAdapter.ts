import ControllerInterface from "../../../domain/application/Controller";
import MiddlewareInterface from "../interface/Middleware";

export default class MiddlewareAdapter implements MiddlewareInterface {
  private nextHandler: ControllerInterface | null = null;

  setNext(handler: ControllerInterface): ControllerInterface {
    this.nextHandler = handler;
    return handler;
  }

  async handle(query: any, body: any, headers: any): Promise<any> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(query, body);
    }
  }
}
