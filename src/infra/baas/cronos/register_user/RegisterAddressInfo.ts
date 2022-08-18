import OutputDTO from "../../../../dto/application/OutputDTO";
import RegisterAddressInfoDTO from "../../../../dto/usecase/RegisterAddressInfoDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class RegisterAddressInfo extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async registerAddressInfo(input: RegisterAddressInfoDTO): Promise<OutputDTO> {
    const { document } = input;
    const individualId = await this.getUserIndividualId(document);
    const body = {
      individual_id: individualId,
      postal_code: input.postalCode,
      street: input.street,
      number: input.number,
      neighborhood: input.neighborhood,
      city: input.city,
      state: input.state,
      address_type_id: input.addressType,
      country: input.country,
      is_web: "1",
    };
    return await this.httpClient.post(process.env.CRONOS_BASE_URL + "/register/individual/step7", body, {
      Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
    });
  }
}
