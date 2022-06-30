import HttpClientInterface from "../../http/client/Client";

export default class Authorize {
  constructor(protected httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<string> {
    const token = await this.httpClient.authorize(id);
    return token;
  }
}
