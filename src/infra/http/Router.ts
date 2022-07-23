import AuthorizeController from "../../application/controller/AuthorizeController";
import BillController from "../../application/controller/BillController";
import InternationalRechargeController from "../../application/controller/InternationalRechargeController";
import NationalRechargeController from "../../application/controller/NationalRechargeController";
import { verifyToken } from "../../application/middleware/Middlewares";
import ExpressAdapter from "./adapter/ExpressAdapter";

const app = ExpressAdapter.create();

app.post("/authorize", ExpressAdapter.route(AuthorizeController.authorize));
app.post("/bills/:digitable", ExpressAdapter.route(verifyToken, BillController.makeBillPayment));
app.post(
  "/national/recharge/:providerId",
  ExpressAdapter.route(verifyToken, NationalRechargeController.makeNationalRecharge)
);
app.post(
  "/international/recharge/:productId",
  ExpressAdapter.route(verifyToken, InternationalRechargeController.makeInternationalRecharge)
);
app.get(
  "/international/countries",
  ExpressAdapter.route(verifyToken, InternationalRechargeController.consultAvailableCountries)
);
app.get(
  "/international/values",
  ExpressAdapter.route(verifyToken, InternationalRechargeController.consultInternationalValues)
);
app.get("/bills/:digitable", ExpressAdapter.route(verifyToken, BillController.consultBill));
app.get("/national/providers", ExpressAdapter.route(verifyToken, NationalRechargeController.consultNationalProviders));
app.get(
  "/national/values/:providerId",
  ExpressAdapter.route(verifyToken, NationalRechargeController.consultNationalValues)
);

export default app;
