import BaasFacadeInterface from "../../domain/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import HttpClientInterface from "../../domain/infra/http/HttpClient";
import CellcoinFacade from "./facade/CellcoinFacade";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createCellcoinFacade(): BaasFacadeInterface {
    return new CellcoinFacade(this.httpClient);
  }
}
