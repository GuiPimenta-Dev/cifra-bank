import AuthorizeController from "../../application/controller/AuthorizeController";
import BillController from "../../application/controller/BillController";
import InternationalRechargeController from "../../application/controller/InternationalRechargeController";
import NationalRechargeController from "../../application/controller/NationalRechargeController";
import PaymentController from "../../application/controller/PaymentController";
import RegisterUserController from "../../application/controller/RegisterUserController";
import { uploadFile, verifyToken } from "../../application/middleware/Middlewares";
import ExpressAdapter from "./adapter/ExpressAdapter";

const app = ExpressAdapter.create();

app.post("/register/user/:document/start", ExpressAdapter.route(RegisterUserController.registerUserInfo));
app.post(
  "/register/user/:document/document",
  uploadFile.single("file"),
  ExpressAdapter.route(RegisterUserController.uploadDocumentImage)
);
app.post("/register/user/:document/info", ExpressAdapter.route(RegisterUserController.registerAdditionalInfo));
app.post(
  "/register/user/:document/selfie",
  uploadFile.single("file"),
  ExpressAdapter.route(RegisterUserController.uploadSelfie)
);
app.post("/register/user/:document/address", ExpressAdapter.route(RegisterUserController.registerAddressInfo));
app.post("/register/user/:document/password", ExpressAdapter.route(RegisterUserController.createPassword));
app.post("/register/user/:document/consultTerm", ExpressAdapter.route(RegisterUserController.consultTerm));
app.post("/register/user/:document/acceptTerm", ExpressAdapter.route(RegisterUserController.acceptTerm));

app.post("/authorize", ExpressAdapter.route(AuthorizeController.authorize));
app.post("/bills/:digitable", verifyToken, ExpressAdapter.route(BillController.makeBillPayment));
app.post(
  "/national/recharge/:providerId",
  verifyToken,
  ExpressAdapter.route(NationalRechargeController.makeNationalRecharge)
);
app.get("/payment/balances/:account", ExpressAdapter.route(verifyToken, PaymentController.consultBalance));
app.post("/payment/ted", ExpressAdapter.route(verifyToken, PaymentController.makeTED));
app.get("/payment/extracts/:account", ExpressAdapter.route(verifyToken, PaymentController.consultExtract));
app.post(
  "/international/recharge/:productId",
  verifyToken,
  ExpressAdapter.route(InternationalRechargeController.makeInternationalRecharge)
);
app.get(
  "/international/countries",
  verifyToken,

  ExpressAdapter.route(InternationalRechargeController.consultAvailableCountries)
);
app.get(
  "/international/values",
  verifyToken,
  ExpressAdapter.route(InternationalRechargeController.consultInternationalValues)
);
app.get("/bills/:digitable", verifyToken, ExpressAdapter.route(BillController.consultBill));
app.get("/national/providers", verifyToken, ExpressAdapter.route(NationalRechargeController.consultNationalProviders));
app.get(
  "/national/values/:providerId",
  verifyToken,
  ExpressAdapter.route(NationalRechargeController.consultNationalValues)
);

export default app;
