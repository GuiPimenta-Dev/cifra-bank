import express from "express";
import HttpError from "../../../application/error/HttpError";
import ControllerInterface from "../../../application/interface/Controller";
import MiddlewareInterface from "../../../application/interface/Middleware";
import HttpInterface from "../../../interface/infra/http/Http";

export default class ExpressAdapter implements HttpInterface {
  app: any;
  baseUrl: string = "/v1";

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.all("*", function (_: any, res: any, next: any) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
      next();
    });
  }

  on(url: string, method: string, fn: ControllerInterface | MiddlewareInterface): any {
    this.app[method](this.baseUrl + url, async function (req: any, res: any) {
      try {
        const { query, body, headers, params } = req;
        const output = await fn.handle({ query, body, headers, path: params });
        res.status(output.statusCode).json(output.data);
      } catch (e: any) {
        if (e instanceof HttpError) {
          return res.status(e.statusCode || 500).json({ message: e.message });
        }
        res.status(422).json({ message: e.message });
      }
    });
  }

  listen(port: number): void {
    return this.app.listen(port);
  }
}
