import OutputDTO from "../../../../dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

interface registerPersonalInfoDTO {
  individualId: number;
  name: string;
  username: string;
  email: string;
  phone: { stateCode: number; number: number };
}

export default class RegisterUserInfo {
  constructor(readonly httpClient: HttpClientInterface) {}

  async isUserRegistered(document: string): Promise<Boolean> {
    const { data } = await this.httpClient.get(
      process.env.CRONOS_BASE_URL + "/individual/" + document,
      {},
      {
        Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
      }
    );
    return data.status == "complete";
  }

  async registerUserDocument(document: string): Promise<OutputDTO> {
    return await this.httpClient.post(
      process.env.CRONOS_BASE_URL + "/register/individual",
      { document },
      {
        Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
      }
    );
  }

  async registerUserPersonalInfo(input: registerPersonalInfoDTO): Promise<OutputDTO> {
    const body = {
      full_name: input.name,
      username: input.username,
      email: input.email,
      individual_id: input.individualId,
      phone_prefix: input.phone.stateCode,
      phone_number: input.phone.number,
    };
    return await this.httpClient.post(process.env.CRONOS_BASE_URL + "/register/individual/step1", body, {
      Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
    });
  }
}
