import jwt from "jsonwebtoken";
import env from "../../../../env";
import AuthMiddlewareAdapter from "../adapter/AuthMiddlewareAdapter";
import HttpError from "../error/HttpError";

export default class AuthMiddleware extends AuthMiddlewareAdapter {
  public async handle(query: any, body: any, headers?: any): Promise<any> {
    const { authorization } = headers;
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        body.token = decodedToken;
        return super.handle(query, body);
      } catch (e) {
        throw new HttpError(401, "Invalid token");
      }
    }
    throw new HttpError(401, "jwt token is required");
  }
}
