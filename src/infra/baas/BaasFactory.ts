import BaasFacadeInterface from "../../domain/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/baas/BaasFactory";
import HttpClientInterface from "../http/interface/HttpClient";
import CellcoinFacade from "./facade/CellcoinFacade";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createCellcoinFacade(): BaasFacadeInterface {
    return new CellcoinFacade(this.httpClient);
  }
}
