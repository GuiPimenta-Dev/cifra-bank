import OutputDTO from "../../../domain/dto/application/OutputDTO";
import AuthorizeFacadeInterface from "../../../domain/infra/baas/facade/AuthorizeFacade";
import HttpClientInterface from "../../../domain/infra/http/HttpClient";
import ArbiAuthorize from "../arbi/authorize/Authorize";
import CelcoinAuthorize from "../celcoin/authorize/Authorize";
export default class AuthorizeFacade implements AuthorizeFacadeInterface {
  constructor(readonly httpClient: HttpClientInterface) {}

  async authorize(id: string, username: string, password: string): Promise<OutputDTO> {
    const arbiAuthorize = new ArbiAuthorize(this.httpClient);
    const code = await arbiAuthorize.getCode(username, password);
    const arbiInfo = await arbiAuthorize.authorize(code, username, password);
    const celcoinAuthorize = new CelcoinAuthorize(this.httpClient);
    const celcoinToken = await celcoinAuthorize.authorize(id);
    return { statusCode: 200, data: { ...arbiInfo, celcoinToken } };
  }
}
