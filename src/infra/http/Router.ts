import AuthorizeController from "../../interface/controller/AuthorizeController";
import ConsultAvailableCountriesController from "../../interface/controller/ConsultAvailableCountriesController";
import ConsultInternationalValuesController from "../../interface/controller/ConsultInternationalValuesController";
import ConsultNationalProvidersController from "../../interface/controller/ConsultNationalProvidersController";
import ConsultNationalValuesController from "../../interface/controller/ConsultNationalValuesController";
import MakeBillPaymentController from "../../interface/controller/MakeBillPaymentController";
import MakeInternationalRechargeController from "../../interface/controller/MakeInternationalRechargeController";
import MakeNationalRechargeController from "../../interface/controller/MakeNationalRechargeController";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import HttpInterface from "../../interface/infra/http/Http";
import JwtMiddleware from "../../interface/middleware/JwtMiddleware";
import Broker from "../broker/Broker";

export default class Router {
  constructor(readonly http: HttpInterface, readonly baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    http.on("/authorize", "post", new AuthorizeController(baasFactory));
    http.on("/international/countries", "get", new JwtMiddleware(new ConsultAvailableCountriesController(baasFactory)));
    http.on("/international/values", "get", new JwtMiddleware(new ConsultInternationalValuesController(baasFactory)));
    http.on("/national/providers", "get", new JwtMiddleware(new ConsultNationalProvidersController(baasFactory)));
    http.on("/national/values", "get", new JwtMiddleware(new ConsultNationalValuesController(baasFactory)));
    http.on("/bills", "post", new JwtMiddleware(new MakeBillPaymentController(baasFactory, broker)));
    http.on("/national/recharge", "post", new JwtMiddleware(new MakeNationalRechargeController(baasFactory, broker)));
    http.on(
      "/international/recharge",
      "post",
      new JwtMiddleware(new MakeInternationalRechargeController(baasFactory, broker))
    );
  }
}
