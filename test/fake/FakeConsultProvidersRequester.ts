import ConsultProvidersRequesterInterface from "../../src/domain/requester/ConsultProvidersRequester";
import FakeAuthorizerRequester from "./FakeAuthorizeRequester";

export default class FakeConsultProvidersRequester
  extends FakeAuthorizerRequester
  implements ConsultProvidersRequesterInterface
{
  async consultProviders(stateCode: number, token: string): Promise<any> {
    return {
      providers: [
        {
          category: 1,
          name: "Correios",
          providerId: 2130,
          RegionaisnameProvider: [],
          TipoRecarganameProvider: 2,
          maxValue: 0.0,
          minValue: 0.0,
        },
        {
          category: 1,
          name: "Embratel",
          providerId: 2090,
          RegionaisnameProvider: [],
          TipoRecarganameProvider: 1,
          maxValue: 0.0,
          minValue: 0.0,
        },
      ],
      errorCode: "000",
      message: "SUCESSO",
      status: 0,
    };
  }
}
