import env from "../../../../env";
import HttpClientInterface from "../../http/interface/HttpClient";

export default class Authorize {
  constructor(protected httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<string> {
    return await this.httpClient.authorize(id, env.CELLCOIN_BASE_URL + "/token");
  }
}
