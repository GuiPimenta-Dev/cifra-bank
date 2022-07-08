import express from "express";
import AuthorizeController from "../../application/controller/AuthorizeController";
import BillController from "../../application/controller/BillController";
import InternationalRechargeController from "../../application/controller/InternationalRechargeController";
import NationalRechargeController from "../../application/controller/NationalRechargeController";
import { verifyToken } from "../../application/middleware/Middlewares";
import ExpressAdapter from "./adapter/ExpressAdapter";

const app = express();
app.use(express.json());

app.post("/authorize", ExpressAdapter.create(AuthorizeController.authorize));
app.post("/bills", ExpressAdapter.create(verifyToken, BillController.makeBillPayment));
app.post("/national/recharge", ExpressAdapter.create(verifyToken, NationalRechargeController.makeNationalRecharge));
app.post(
  "/international/recharge",
  ExpressAdapter.create(verifyToken, InternationalRechargeController.makeInternationalRecharge)
);
app.get(
  "/international/countries",
  ExpressAdapter.create(verifyToken, InternationalRechargeController.consultAvailableCountries)
);
app.get(
  "/international/values",
  ExpressAdapter.create(verifyToken, InternationalRechargeController.consultInternationalValues)
);
app.get("/bills", ExpressAdapter.create(verifyToken, BillController.consultBill));
app.get("/national/providers", ExpressAdapter.create(verifyToken, NationalRechargeController.consultNationalProviders));
app.get("/national/values", ExpressAdapter.create(verifyToken, NationalRechargeController.consultNationalValues));

export default app;
