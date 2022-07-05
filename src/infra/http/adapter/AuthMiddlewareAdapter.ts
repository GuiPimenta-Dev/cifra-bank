import ControllerInterface from "../../../domain/application/Controller";
import MiddlewareInterface from "../interface/Middleware";

export default class AuthMiddlewareAdapter implements MiddlewareInterface {
  private nextHandler: ControllerInterface | null = null;

  setNext(handler: ControllerInterface): ControllerInterface {
    this.nextHandler = handler;
    return handler;
  }

  async handle(query: any, body: any): Promise<any> {
    if (this.nextHandler) {
      return await this.nextHandler.handle(query, body);
    }
  }
}
