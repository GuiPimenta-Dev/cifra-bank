import HttpClientInterface from "../../domain/http/HttpClient";
import ConsultProvidersRequesterInterface from "../../domain/requester/ConsultProvidersRequester";
import AuthorizeRequester from "./AuthorizeRequester";

export default class ConsultProviderRequester extends AuthorizeRequester implements ConsultProvidersRequesterInterface {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultProviders(stateCode: number, token: string): Promise<any> {
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
