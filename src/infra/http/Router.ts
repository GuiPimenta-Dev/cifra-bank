import AuthorizeController from "../../application/controller/AuthorizeController";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import Broker from "../broker/Broker";
import HttpInterface from "./interface/Http";

export default class Router {
  constructor(http: HttpInterface, baasFactory: BaasFactoryInterface, readonly broker: Broker) {
    const cellcoinFacade = baasFactory.createCellcoinFacade();

    http.on("/authorize", "post", async function (params: any, body: any) {
      const authorizeController = new AuthorizeController(cellcoinFacade);
      return authorizeController.handle(params, body);
    });
  }
}
