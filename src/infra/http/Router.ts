import ControllerInterface from "../../domain/application/Controller";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import Broker from "../broker/Broker";
import AuthorizeController from "../controller/AuthorizeController";
import ConsultAvailableCountriesController from "../controller/ConsultAvailableCountriesController";
import HttpInterface from "./interface/Http";
import AuthMiddleware from "./middleware/Auth";

function protectRoute(req: any, controller: ControllerInterface): any {
  const jwt = new AuthMiddleware();
  jwt.setNext(controller);
  return jwt.handle(req.query, req.body, req.headers);
}

export default class Router {
  constructor(readonly http: HttpInterface, readonly baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    http.on("/authorize", "post", async function (req: any, res: any) {
      const authorizeController = new AuthorizeController(baasFactory);
      return authorizeController.handle(req.query, req.body);
    });

    http.on("/consult/internationalRecharge/availableCountries", "get", async function (req: any) {
      return protectRoute(req, new ConsultAvailableCountriesController(baasFactory));
    });
  }
}
