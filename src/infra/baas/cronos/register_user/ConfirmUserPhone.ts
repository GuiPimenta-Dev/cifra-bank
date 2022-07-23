import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import ConfirmUserPhoneDTO from "../../../../domain/dto/usecase/ConfirmUserPhoneDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class ConfirmUserPhone extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async confirmSMSCode(input: ConfirmUserPhoneDTO): Promise<OutputDTO> {
    const { document, stateCode, number, code } = input;
    const individualId = await this.getUserIndividualId(document);
    const body = {
      individual_id: individualId,
      phone_prefix: stateCode,
      phone_number: number,
      code,
    };
    return await this.httpClient.put(env.CRONOS_BASE_URL + "/register/individual/step2", body, {
      Authorization: `Bearer ${env.CRONOS_SECRET}`,
    });
  }
}
