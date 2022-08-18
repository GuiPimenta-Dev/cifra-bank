import OutputDTO from "../../../../dto/application/OutputDTO";
import RegisterAdditionalInfoDTO from "../../../../dto/usecase/RegisterAdditionalInfoDTO";
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
      issuance_date: documentInfo.issuanceDate,
      orgao_emissor: documentInfo.issuingAgency,
      mother_name: info.motherName,
      birth_date: info.birthDate,
      marital_status: info.maritalStatus,
      nacionalidade_estado: info.nationalityState,
      nationality: info.nationality,
      gender: info.gender,
      renda_mensal: info.monthlyProfit,
      is_web: "1",
    };
    return await this.httpClient.post(process.env.CRONOS_BASE_URL + "/register/individual/step4", body, {
      Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
    });
  }
}
