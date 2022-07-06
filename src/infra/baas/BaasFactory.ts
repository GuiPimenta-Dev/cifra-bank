import BaasFacadeInterface from "../../interface/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../interface/infra/baas/BaasFactory";
import HttpClientInterface from "../../interface/infra/http/HttpClient";
import CellcoinFacade from "./facade/CellcoinFacade";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createCellcoinFacade(): BaasFacadeInterface {
    return new CellcoinFacade(this.httpClient);
  }
}
