import InputDTO from "../../domain/dto/application/InputDTO";
import OutputDTO from "../../domain/dto/application/OutputDTO";
import BaasFactory from "../../infra/baas/BaasFactory";
import AxiosAdapter from "../../infra/http/adapter/AxiosAdapter";
import Authorize from "../../usecase/authorize/Authorize";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const authorizeFacade = baasFactory.createAuthorizeFacade();

export default class AuthorizeController {
  static async authorize(input: InputDTO): Promise<OutputDTO> {
    const { body } = input;
    const authorize = new Authorize(authorizeFacade);
    return await authorize.execute(body.id, body.document, body.username, body.password);
  }
}
