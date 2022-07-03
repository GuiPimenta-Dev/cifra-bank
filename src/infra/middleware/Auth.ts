import jwt from "jsonwebtoken";
import env from "../../../env";

export function verifyToken(req: any, res: any, next: any) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"
      ? req.headers.authorization.split(" ")[1]
      : req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    req.decoded = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Invalid Token!",
    });
  }
}

export function protectRoute(req: any, res: any, next: any) {
  console.log(req);
  if (req.decoded) {
    return next();
  }

  res.status(401).send({
    error: "Not Authorized!",
  });
}
