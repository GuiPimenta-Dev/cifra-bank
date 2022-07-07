import jwt from "jsonwebtoken";
import env from "../../../env";
import InputDTO from "../dto/InputDTO";
import HttpError from "../error/HttpError";

export async function verifyToken(input: InputDTO): Promise<any> {
  const { authorization } = input.headers;
  if (!authorization) throw new HttpError(400, "Authorization header is required");
  const token = authorization.split(" ")[1];
  if (!token) throw new HttpError(401, "jwt token is required");
  try {
    input.headers.auth = jwt.verify(token, env.JWT_SECRET);
  } catch (e) {
    throw new HttpError(401, "Invalid token");
  }
}
