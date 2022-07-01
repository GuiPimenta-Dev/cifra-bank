import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../baas/cellcoin/ConsultNationalRechargeValues";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createMakeNationalRecharge(): MakeNationalRecharge {
    return new MakeNationalRecharge(this.httpClient);
  }

  createConsultNationalRechargeValues() {
    return new ConsultNationalRechargeValues(this.httpClient);
  }

  createConsultProviders(): ConsultNationalProviders {
    return new ConsultNationalProviders(this.httpClient);
  }
}
