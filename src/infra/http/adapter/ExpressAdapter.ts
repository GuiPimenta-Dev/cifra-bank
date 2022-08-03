import express from "express";
import HttpError from "../../../application/error/HttpError";

export default class ExpressAdapter {
  static create() {
    const app = express();
    app.use(express.json());
    return app;
  }

  static route(fn: any) {
    return async function (req: any, res: any) {
      try {
        const { query, body, headers, params, file } = req;
        const output = await fn({ query, body, headers, path: params, file });
        res.status(output.statusCode).json(output.data);
      } catch (e: any) {
        if (e instanceof HttpError) {
          return res.status(e.statusCode || 500).json({ message: e.message });
        }
        res.status(422).json({ message: e.message });
      }
    };
  }
}
