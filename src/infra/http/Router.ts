import AuthorizeController from "../../application/controller/AuthorizeController";
import ConsultAvailableCountriesController from "../../application/controller/ConsultAvailableCountriesController";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import Broker from "../broker/Broker";
import HttpInterface from "./interface/Http";

export default class Router {
  constructor(readonly http: HttpInterface, readonly baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    http.on("/authorize", "post", new AuthorizeController(baasFactory), false);
    http.on("/international/countries", "get", new ConsultAvailableCountriesController(baasFactory));
  }
}
