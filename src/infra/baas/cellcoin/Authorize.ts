import HttpClientInterface from "../../../domain/adapter/HttpClient";

export default class Authorize {
  constructor(protected httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<string> {
    const token = await this.httpClient.authorize(id);
    return token;
  }
}
