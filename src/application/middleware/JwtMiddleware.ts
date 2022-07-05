import jwt from "jsonwebtoken";
import env from "../../../env";
import ControllerInterface from "../../domain/application/Controller";
import MiddlewareInterface from "../../domain/application/Middleware";
import HttpDTO from "../dto/HttpDTO";
import HttpError from "../error/HttpError";

export default class JwtMiddleware implements MiddlewareInterface {
  private nextHandler: ControllerInterface | null = null;

  setNext(controller: ControllerInterface): void {
    this.nextHandler = controller;
  }

  public async handle(input: HttpDTO): Promise<any> {
    const { authorization, ...headers } = input.headers;
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        headers.token = jwt.verify(token, env.JWT_SECRET);
        input.headers = headers;
        return this.nextHandler ? await this.nextHandler.handle(input) : null;
      } catch (e) {
        throw new HttpError(401, "Invalid token");
      }
    }
    throw new HttpError(401, "jwt token is required");
  }
}
