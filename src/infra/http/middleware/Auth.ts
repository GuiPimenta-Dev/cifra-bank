import jwt from "jsonwebtoken";
import env from "../../../../env";

export default async function protectRoute(req: any, res: any, next: any) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).send({
      error: "Not Authorized!",
    });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    req.body.token = decodedToken;
    return await next(req.query, req.body);
  } catch (error) {
    res.status(401).send({
      error: "Invalid Token!",
    });
  }
}
