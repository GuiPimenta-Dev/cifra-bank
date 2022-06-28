import NationalRechargeRequester from "../../infra/requester/NationalRechargeRequester";

export default interface RequesterFactory {
  createNationalRechargeRequester(): NationalRechargeRequester;
}
