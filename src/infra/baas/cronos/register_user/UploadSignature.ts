import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class UploadSignature extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async sendSignature(document: string, file: File | string, type: string): Promise<OutputDTO> {
    const individualId = await this.getUserIndividualId(document);
    return await this.httpClient.post(
      env.CRONOS_BASE_URL + "/register/individual/step5/" + individualId,
      {
        file,
        image_type: type,
      },
      {
        Authorization: `Bearer ${env.CRONOS_SECRET}`,
      }
    );
  }
}
