import BaasFacade from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import CellcoinFacade from "../facade/CellcoinFacade";
import HttpClientInterface from "../http/client/Client";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createCellcoinFacade(): BaasFacade {
    return new CellcoinFacade(this.httpClient);
  }
}
