import ConsultNationalProvidersRequesterInterface from "../requester/ConsultNationalProvidersRequester";
import NationalRechargeRequesterInterface from "../requester/NationalRechargeRequester";

export default interface RequesterFactoryInterface {
  createNationalRechargeRequester(): NationalRechargeRequesterInterface;
  createConsultProviderRequester(): ConsultNationalProvidersRequesterInterface;
}
