import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class ConsultTerm extends User {
  constructor(readonly httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async consultTerm(document: string, term: string): Promise<OutputDTO> {
    const individualId = await this.getUserIndividualId(document);
    const URL = env.CRONOS_BASE_URL + "/account/consultatermo";
    return await this.httpClient.post(
      URL,
      {
        individual_id: individualId,
        tipo_termo: term,
      },
      { Authorization: `Bearer ${env.CRONOS_SECRET}` }
    );
  }
}
