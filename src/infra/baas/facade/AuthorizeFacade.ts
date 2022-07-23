import OutputDTO from "../../../domain/dto/application/OutputDTO";
import AuthorizeFacadeInterface from "../../../domain/infra/baas/facade/AuthorizeFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import CelcoinAuthorize from "../celcoin/authorize/Authorize";

export default class AuthorizeFacade implements AuthorizeFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<OutputDTO> {
    const celcoinAuthorize = new CelcoinAuthorize(this.httpClient);
    return await celcoinAuthorize.authorize(id);
  }
}
