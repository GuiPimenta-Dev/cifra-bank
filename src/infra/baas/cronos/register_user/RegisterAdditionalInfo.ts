import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import RegisterAdditionalInfoDTO from "../../../../domain/dto/usecase/RegisterAdditionalInfoDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class RegisterAdditionalInfo extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async sendInfo(input: RegisterAdditionalInfoDTO): Promise<OutputDTO> {
    const { document, documentInfo, ...info } = input;
    const individualId = await this.getUserIndividualId(document);
    const body = {
      individual_id: individualId,
      document_name: documentInfo.type,
      document_number: documentInfo.number,
      document_state: documentInfo.state,
      mother_name: info.motherName,
      birth_date: info.birthDate,
      marital_status: info.maritalStatus,
      nationality_state: info.nationalityState,
      nationality: info.nationality,
      gender: info.gender,
    };
    return await this.httpClient.post(env.CRONOS_BASE_URL + "/register/individual/step4", body, {
      Authorization: `Bearer ${env.CRONOS_SECRET}`,
    });
  }
}
