import BaasFactoryInterface from "../../domain/factory/BaasFactory";
import ConsultNationalProviders from "../baas/cellcoin/ConsultNationalProviders";
import ConsultNationalRechargeValues from "../baas/cellcoin/ConsultNationalRechargeValues";
import MakeInternationalRecharge from "../baas/cellcoin/MakeInternationalRecharge";
import MakeNationalRecharge from "../baas/cellcoin/MakeNationalRecharge";
import HttpClientInterface from "../http/client/Client";

export default class CellcoinFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createConsultProviders(): ConsultNationalProviders {
    return new ConsultNationalProviders(this.httpClient);
  }

  createConsultNationalRechargeValues() {
    return new ConsultNationalRechargeValues(this.httpClient);
  }

  createMakeNationalRecharge(): MakeNationalRecharge {
    return new MakeNationalRecharge(this.httpClient);
  }

  createMakeInternationalRecharge() {
    return new MakeInternationalRecharge(this.httpClient);
  }
}
