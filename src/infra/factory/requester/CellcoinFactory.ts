import HttpClientInterface from "../../../domain/adapter/HttpClient";
import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import ConsultNationalProviderRequester from "../../requester/cellcoin/ConsultNationalProviderRequester";
import NationalRechargeRequester from "../../requester/cellcoin/NationalRechargeRequester";

export default class CellcoinFactory implements RequesterFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createNationalRechargeRequester(): NationalRechargeRequester {
    return new NationalRechargeRequester(this.httpClient);
  }

  createConsultProviderRequester(): ConsultNationalProviderRequester {
    return new ConsultNationalProviderRequester(this.httpClient);
  }
}
