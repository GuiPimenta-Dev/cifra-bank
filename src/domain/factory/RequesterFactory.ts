import ConsultProviderRequester from "../../infra/requester/cellcoin/ConsultNationalProviderRequester";
import NationalRechargeRequester from "../../infra/requester/cellcoin/NationalRechargeRequester";

export default interface RequesterFactoryInterface {
  createNationalRechargeRequester(): NationalRechargeRequester;
  createConsultProviderRequester(): ConsultProviderRequester;
}
