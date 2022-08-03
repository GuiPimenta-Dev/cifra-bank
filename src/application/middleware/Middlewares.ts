import jwt from "jsonwebtoken";
import multer from "multer";
import env from "../../../env";
import InputDTO from "../../domain/dto/application/InputDTO";
import HttpError from "../error/HttpError";

export function verifyToken(input: InputDTO): void {
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_, file, cb) {
    const fileExtension = file.originalname.split(".").at(-1);
    const newFileName = require("crypto").randomBytes(64).toString("hex");
    cb(null, `${newFileName}.${fileExtension}`);
  },
});

export const uploadFile = multer({ storage });
