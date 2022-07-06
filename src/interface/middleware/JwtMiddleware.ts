import jwt from "jsonwebtoken";
import env from "../../../env";
import HttpDTO from "../../application/dto/InputDTO";
import HttpError from "../../application/error/HttpError";
import ControllerInterface from "../../application/interface/Controller";
import MiddlewareInterface from "../../application/interface/Middleware";

export default class JwtMiddleware implements MiddlewareInterface {
  private nextHandler: ControllerInterface;

  constructor(controller: ControllerInterface) {
    this.nextHandler = controller;
  }

  public async handle(input: HttpDTO): Promise<any> {
    const { authorization, ...headers } = input.headers;
    if (!authorization) throw new HttpError(400, "Authorization header is required");
    const token = authorization.split(" ")[1];
    if (!token) throw new HttpError(401, "jwt token is required");
    try {
      headers.auth = jwt.verify(token, env.JWT_SECRET);
    } catch (e) {
      throw new HttpError(401, "Invalid token");
    }
    input.headers = headers;
    return await this.nextHandler.handle(input);
  }
}
