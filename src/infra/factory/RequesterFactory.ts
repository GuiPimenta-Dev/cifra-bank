import HttpClientInterface from "../../domain/adapter/HttpClient";
import RequesterFactoryInterface from "../../domain/factory/RequesterFactory";
import ConsultNationalProvidersRequesterInterface from "../../domain/requester/ConsultNationalProvidersRequester";
import { NationalRechargeRequesterInterface } from "../../domain/requester/NationalRechargeRequester";
import CellcoinFactory from "./baas/CellcoinFactory";

export default class RequesterFactory implements RequesterFactoryInterface {
  cellcoinFactory: CellcoinFactory;

  constructor(readonly httpClient: HttpClientInterface) {
    this.cellcoinFactory = new CellcoinFactory(httpClient);
  }

  createNationalRechargeRequester(): NationalRechargeRequesterInterface {
    return this.cellcoinFactory.createNationalRechargeRequester();
  }

  createConsultProviderRequester(): ConsultNationalProvidersRequesterInterface {
    return this.cellcoinFactory.createConsultProviderRequester();
  }
}
