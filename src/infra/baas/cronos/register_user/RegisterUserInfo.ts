import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

interface registerPersonalInfoDTO {
  individualId: number;
  name: string;
  username: string;
  email: string;
}

export default class RegisterUserInfo {
  constructor(readonly httpClient: HttpClientInterface) {}

  async isUserRegistered(document: string): Promise<Boolean> {
    const { data } = await this.httpClient.get(
      env.CRONOS_BASE_URL + "/individual/" + document,
      {},
      {
        Authorization: `Bearer ${env.CRONOS_SECRET}`,
      }
    );
    return data.status == "complete";
  }

  async registerUserDocument(document: string): Promise<OutputDTO> {
    return await this.httpClient.post(
      env.CRONOS_BASE_URL + "/register/individual",
      { document },
      {
        Authorization: `Bearer ${env.CRONOS_SECRET}`,
      }
    );
  }

  async registerUserPersonalInfo(input: registerPersonalInfoDTO): Promise<OutputDTO> {
    const body = {
      full_name: input.name,
      username: input.username,
      email: input.email,
      individual_id: input.individualId,
    };
    return await this.httpClient.post(env.CRONOS_BASE_URL + "/register/individual/step1", body, {
      Authorization: `Bearer ${env.CRONOS_SECRET}`,
    });
  }

  async registerUserPhone(individualId: number, stateCode: number, number: number): Promise<OutputDTO> {
    const body = {
      individual_id: individualId,
      phone_prefix: stateCode,
      phone_number: number,
    };
    return await this.httpClient.post(env.CRONOS_BASE_URL + "/register/individual/step2", body, {
      Authorization: `Bearer ${env.CRONOS_SECRET}`,
    });
  }
}
