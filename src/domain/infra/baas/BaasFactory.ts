import HttpClientInterface from "../http/HttpClient";
import AuthorizeFacadeInterface from "./facade/AuthorizeFacade";
import BillFacadeInterface from "./facade/BillFacade";
import InternationalRechargeFacadeInterface from "./facade/InternationalRechargeFacade";
import NationalRechargeFacadeInterface from "./facade/NationalRechargeFacade";

export default interface BaasFactoryInterface {
  httpClient: HttpClientInterface;
  createAuthorizeFacade(): AuthorizeFacadeInterface;
  createBillFacade(): BillFacadeInterface;
  createInternationalRechargeFacade(): InternationalRechargeFacadeInterface;
  createNationalRechargeFacade(): NationalRechargeFacadeInterface;
}
