import jwt from "jsonwebtoken";
import env from "../../../env";
import ControllerInterface from "../../domain/application/Controller";
import MiddlewareInterface from "../../domain/application/Middleware";
import HttpError from "../../infra/http/error/HttpError";

export default class AuthMiddleware implements MiddlewareInterface {
  private nextHandler: ControllerInterface;

  constructor(controller: ControllerInterface) {
    this.nextHandler = controller;
  }

  public async handle(query: any, body: any, headers: any): Promise<any> {
    const { authorization } = headers;
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        body.token = jwt.verify(token, env.JWT_SECRET);
        return await this.nextHandler.handle(query, body);
      } catch (e) {
        throw new HttpError(401, "Invalid token");
      }
    }
    throw new HttpError(401, "jwt token is required");
  }
}
