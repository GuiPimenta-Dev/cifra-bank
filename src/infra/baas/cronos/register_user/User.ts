import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class User {
  constructor(readonly httpClient: HttpClientInterface) {}
  async getUserIndividualId(document: string): Promise<number> {
    const { data } = await this.httpClient.get(
      process.env.CRONOS_BASE_URL + "/individual/" + document,
      {},
      {
        Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
      }
    );
    return data.individual_id;
  }
}
