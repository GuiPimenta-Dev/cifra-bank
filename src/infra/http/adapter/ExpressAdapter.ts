import express from "express";
import AuthMiddleware from "../../../application/middleware/AuthMiddleware";
import ControllerInterface from "../../../domain/application/Controller";
import HttpError from "../error/HttpError";
import Http from "../interface/Http";

export default class ExpressAdapter implements Http {
  app: any;
  baseUrl: string = "/v1";

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.all("*", function (req: any, res: any, next: any) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
      next();
    });
  }

  on(url: string, method: string, controller: ControllerInterface, authorize: boolean = true): void {
    this.app[method](this.baseUrl + url, async function (req: any, res: any) {
      try {
        let output: any;
        if (authorize) {
          const authMiddleware = new AuthMiddleware(controller);
          output = await authMiddleware.handle(req.query, req.body, req.headers);
        } else {
          output = await controller.handle(req.query, req.body);
        }
        res.json(output);
      } catch (e: any) {
        if (e instanceof HttpError) {
          return res.status(e.statusCode).json({ message: e.message });
        }
        res.status(422).json({ message: e.message });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
