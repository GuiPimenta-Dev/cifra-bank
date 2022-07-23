import env from "../../../../../env";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

export default class User {
  constructor(readonly httpClient: HttpClientInterface) {}
  async getUserIndividualId(document: string): Promise<number> {
    const { data } = await this.httpClient.get(
      env.CRONOS_BASE_URL + "/individual/" + document,
      {},
      {
        Authorization: `Bearer ${env.CRONOS_SECRET}`,
      }
    );
    return data.individual_id;
  }
}
