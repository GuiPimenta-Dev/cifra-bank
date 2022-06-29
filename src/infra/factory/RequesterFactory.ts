import HttpClientInterface from "../../domain/adapter/HttpClient";
import RequesterFactoryInterface from "../../domain/factory/RequesterFactory";
import ConsultProviderRequester from "../requester/ConsultProviderRequester";
import NationalRechargeRequester from "../requester/NationalRechargeRequester";

export default class RequesterFactory implements RequesterFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createNationalRechargeRequester(): NationalRechargeRequester {
    return new NationalRechargeRequester(this.httpClient);
  }

  createConsultProviderRequester(): ConsultProviderRequester {
    return new ConsultProviderRequester(this.httpClient);
  }
}
