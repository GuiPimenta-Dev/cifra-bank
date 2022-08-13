import HttpClientInterface from "../http/HttpClient";
import AuthorizeFacadeInterface from "./facade/AuthorizeFacade";
import BillFacadeInterface from "./facade/BillFacade";
import InternationalRechargeFacadeInterface from "./facade/InternationalRechargeFacade";
import NationalRechargeFacadeInterface from "./facade/NationalRechargeFacade";
import PaymentFacadeInterface from "./facade/PaymentFacade";
import RegisterUserFacadeInterface from "./facade/RegisterUserFacade";

export default interface BaasFactoryInterface {
  httpClient: HttpClientInterface;
  createRegisterUserFacade(): RegisterUserFacadeInterface;
  createAuthorizeFacade(): AuthorizeFacadeInterface;
  createBillFacade(): BillFacadeInterface;
  createInternationalRechargeFacade(): InternationalRechargeFacadeInterface;
  createNationalRechargeFacade(): NationalRechargeFacadeInterface;
  createPaymentFacade(): PaymentFacadeInterface;
}
