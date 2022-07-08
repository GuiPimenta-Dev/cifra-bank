import env from "../../../../../env";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class Authorize {
  constructor(protected httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<any> {
    return await this.httpClient.authorize(id, env.CELLCOIN_BASE_URL + "/token");
  }
}
