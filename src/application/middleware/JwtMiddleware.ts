import jwt from "jsonwebtoken";
import env from "../../../env";
import ControllerInterface from "../../domain/application/Controller";
import MiddlewareInterface from "../../domain/application/Middleware";
import HttpDTO from "../dto/InputDTO";
import HttpError from "../error/HttpError";

export default class JwtMiddleware implements MiddlewareInterface {
  private nextHandler: ControllerInterface;

  constructor(controller: ControllerInterface) {
    this.nextHandler = controller;
  }

  public async handle(input: HttpDTO): Promise<any> {
    const { authorization, ...headers } = input.headers;
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        headers.token = jwt.verify(token, env.JWT_SECRET);
        input.headers = headers;
        return await this.nextHandler.handle(input);
      } catch (e) {
        throw new HttpError(401, "Invalid token");
      }
    }
    throw new HttpError(401, "jwt token is required");
  }
}
