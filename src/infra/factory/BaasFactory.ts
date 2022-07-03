import BaasFacadeInterface from "../../domain/facade/BaasFacade";
import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import CellcoinFacade from "../facade/CellcoinFacade";
import HttpClientInterface from "../http/interface/HttpClient";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createCellcoinFacade(): BaasFacadeInterface {
    return new CellcoinFacade(this.httpClient);
  }
}
