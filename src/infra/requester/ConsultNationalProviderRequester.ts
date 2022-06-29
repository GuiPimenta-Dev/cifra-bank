import HttpClientInterface from "../../domain/adapter/HttpClient";
import ConsultNationalProvidersRequesterInterface from "../../domain/requester/ConsultNationalProvidersRequester";
import AuthorizeRequester from "./AuthorizeRequester";

export default class ConsultNationalProviderRequester
  extends AuthorizeRequester
  implements ConsultNationalProvidersRequesterInterface
{
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultNationalProviders(stateCode: number, token: string): Promise<any> {
    const { providers } = await this.httpClient.get(
      "/transactions/topups/providers",
      { stateCode },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { providers };
  }
}
