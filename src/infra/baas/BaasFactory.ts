import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import AuthorizeFacadeInterface from "../../domain/infra/baas/facade/AuthorizeFacade";
import BillFacadeInterface from "../../domain/infra/baas/facade/BillFacade";
import InternationalRechargeFacadeInterface from "../../domain/infra/baas/facade/InternationalRechargeFacade";
import NationalRechargeFacadeInterface from "../../domain/infra/baas/facade/NationalRechargeFacade";
import RegisterUserFacadeInterface from "../../domain/infra/baas/facade/RegisterUserFacade";
import HttpClientInterface from "../../domain/infra/http/HttpClient";
import AuthorizeFacade from "./facade/AuthorizeFacade";
import BillFacade from "./facade/BillFacade";
import InternationalRechargeFacade from "./facade/InternationalRechargeFacade";
import NationalRechargeFacade from "./facade/NationalRechargeFacade";
import RegisterUserFacade from "./facade/RegisterUserFacade";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createRegisterUserFacade(): RegisterUserFacadeInterface {
    return new RegisterUserFacade(this.httpClient);
  }

  createAuthorizeFacade(): AuthorizeFacadeInterface {
    return new AuthorizeFacade(this.httpClient);
  }

  createBillFacade(): BillFacadeInterface {
    return new BillFacade(this.httpClient);
  }

  createInternationalRechargeFacade(): InternationalRechargeFacadeInterface {
    return new InternationalRechargeFacade(this.httpClient);
  }

  createNationalRechargeFacade(): NationalRechargeFacadeInterface {
    return new NationalRechargeFacade(this.httpClient);
  }
}
