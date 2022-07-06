import AuthorizeController from "../../interface/controller/AuthorizeController";
import ConsultAvailableCountriesController from "../../interface/controller/ConsultAvailableCountriesController";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import HttpInterface from "../../interface/infra/http/Http";
import JwtMiddleware from "../../interface/middleware/JwtMiddleware";
import Broker from "../broker/Broker";

export default class Router {
  constructor(readonly http: HttpInterface, readonly baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    http.on("/authorize", "post", new AuthorizeController(baasFactory));
    http.on("/international/countries", "get", new JwtMiddleware(new ConsultAvailableCountriesController(baasFactory)));
  }
}
