import HttpClientInterface from "../../domain/http/HttpClient";

export default class AuthorizeRequester {
  constructor(protected httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<string> {
    const token = await this.httpClient.authorize(id);
    return token;
  }
}
