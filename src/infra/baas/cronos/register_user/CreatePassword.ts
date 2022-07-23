import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class CreatePassword extends User {
  constructor(readonly httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async createPassword(document: string, password: string, confirmPassword: string): Promise<OutputDTO> {
    const individualId = await this.getUserIndividualId(document);
    return await this.httpClient.post(
      env.CRONOS_BASE_URL + "/register/individual/step8",
      {
        individual_id: individualId,
        password,
        confirm_password: confirmPassword,
      },
      { Authorization: `Bearer ${env.CRONOS_SECRET}` }
    );
  }
}
