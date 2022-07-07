import express from "express";
import Controller from "../../application/controller/Controller";
import { verifyToken } from "../../application/middleware/Middlewares";
import ExpressAdapter from "./adapter/ExpressAdapter";

const app = express();
app.use(express.json());

app.post("/authorize", ExpressAdapter.create(Controller.authorize));
app.post("/bills", ExpressAdapter.create(verifyToken, Controller.makeBillPayment));
app.post("/national/recharge", ExpressAdapter.create(verifyToken, Controller.makeNationalRecharge));
app.post("/international/recharge", ExpressAdapter.create(verifyToken, Controller.makeInternationalRecharge));
app.get("/international/countries", ExpressAdapter.create(verifyToken, Controller.consultAvailableCountries));
app.get("/international/values", ExpressAdapter.create(verifyToken, Controller.consultInternationalValues));
app.get("/bills", ExpressAdapter.create(verifyToken, Controller.consultBill));
app.get("/national/providers", ExpressAdapter.create(verifyToken, Controller.consultNationalProviders));
app.get("/national/values", ExpressAdapter.create(verifyToken, Controller.consultNationalProviders));

export default app;
