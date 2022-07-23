import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import HttpClientInterface from "../../domain/infra/http/HttpClient";
import AuthorizeFacade from "./facade/AuthorizeFacade";
import BillFacade from "./facade/BillFacade";
import InternationalRechargeFacade from "./facade/InternationalRechargeFacade";
import NationalRechargeFacade from "./facade/NationalRechargeFacade";
import RegisterUserFacade from "./facade/RegisterUserFacade";

export default class BaasFactory implements BaasFactoryInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  createRegisterUserFacade(): RegisterUserFacade {
    return new RegisterUserFacade(this.httpClient);
  }

  createAuthorizeFacade(): AuthorizeFacade {
    return new AuthorizeFacade(this.httpClient);
  }

  createBillFacade(): BillFacade {
    return new BillFacade(this.httpClient);
  }

  createInternationalRechargeFacade(): InternationalRechargeFacade {
    return new InternationalRechargeFacade(this.httpClient);
  }

  createNationalRechargeFacade(): NationalRechargeFacade {
    return new NationalRechargeFacade(this.httpClient);
  }
}
