import ConsultProviderRequester from "../../infra/requester/ConsultNationalProviderRequester";
import NationalRechargeRequester from "../../infra/requester/NationalRechargeRequester";

export default interface RequesterFactoryInterface {
  createNationalRechargeRequester(): NationalRechargeRequester;
  createConsultProviderRequester(): ConsultProviderRequester;
}
