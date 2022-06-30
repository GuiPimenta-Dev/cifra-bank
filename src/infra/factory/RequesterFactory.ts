import HttpClientInterface from "../../domain/adapter/HttpClient";
import RequesterFactoryInterface from "../../domain/factory/RequesterFactory";
import ConsultNationalProviderRequester from "../requester/cellcoin/ConsultNationalProviderRequester";
import NationalRechargeRequester from "../requester/cellcoin/NationalRechargeRequester";
import CellcoinFactory from "./CellcoinFactory";

export default class RequesterFactory implements RequesterFactoryInterface {
  cellcoinFactory: CellcoinFactory;

  constructor(readonly httpClient: HttpClientInterface) {
    this.cellcoinFactory = new CellcoinFactory(httpClient);
  }

  createNationalRechargeRequester(): NationalRechargeRequester {
    return this.cellcoinFactory.createNationalRechargeRequester();
  }

  createConsultProviderRequester(): ConsultNationalProviderRequester {
    return this.cellcoinFactory.createConsultProviderRequester();
  }
}
