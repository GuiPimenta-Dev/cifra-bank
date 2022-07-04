import express from "express";
import HttpError from "../error/HttpError";
import Http from "../interface/Http";

export default class ExpressAdapter implements Http {
  app: any;

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

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const output = await fn(req, res);
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
