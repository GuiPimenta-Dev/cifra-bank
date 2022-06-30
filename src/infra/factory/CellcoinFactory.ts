import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createMakeNationalRecharge(): MakeNationalRecharge {
    return new MakeNationalRecharge(this.httpClient);
  }

  createConsultProviders(): ConsultNationalProviders {
    return new ConsultNationalProviders(this.httpClient);
  }
}
