import AuthorizeController from "../../application/controller/AuthorizeController";
import ConsultAvailableCountriesController from "../../application/controller/ConsultAvailableCountriesController";
import ControllerInterface from "../../domain/application/Controller";
import MiddlewareInterface from "../../domain/application/Middleware";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import Broker from "../broker/Broker";
import HttpInterface from "./interface/Http";

export default class Router {
  constructor(
    readonly http: HttpInterface,
    readonly baasFactory: BaasFactoryInterface,
    readonly broker: Broker,
    readonly middleware: MiddlewareInterface
  ) {
    http.on("/authorize", "post", new AuthorizeController(baasFactory));
    http.on(
      "/international/countries",
      "get",
      this.protectRoute(middleware, new ConsultAvailableCountriesController(baasFactory))
    );
  }

  private protectRoute(middleware: MiddlewareInterface, controller: ControllerInterface): MiddlewareInterface {
    middleware.setNext(controller);
    return middleware;
  }
}
