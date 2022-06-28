import ConsultProviderRequester from "../../infra/requester/ConsultProviderRequester";
import NationalRechargeRequester from "../../infra/requester/NationalRechargeRequester";

export default interface RequesterFactoryInterface {
  createNationalRechargeRequester(): NationalRechargeRequester;
  createConsultProviderRequester(): ConsultProviderRequester;
}
