import AuthorizeController from "../../application/controller/AuthorizeController";
import ConsultAvailableCountriesController from "../../application/controller/ConsultAvailableCountriesController";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import Broker from "../broker/Broker";
import HttpInterface from "./interface/Http";
import { protectRoute } from "./middleware/Auth";

export default class Router {
  constructor(readonly http: HttpInterface, readonly baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    http.on("/authorize", "post", async function (params: any, body: any) {
      const authorizeController = new AuthorizeController(baasFactory);
      return authorizeController.handle(params, body);
    });

    http.on(
      "/consult/internationalRecharge/availableCountries",
      "get",
      protectRoute,
      async function (params: any, body?: any) {
        const consultAvailableCountriesController = new ConsultAvailableCountriesController(baasFactory);
        return consultAvailableCountriesController.handle(params, body);
      }
    );
  }
}
