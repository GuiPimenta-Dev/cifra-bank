import fs from "fs";
import { resolve } from "path";
import env from "../../../../../env";
import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class UploadSelfie extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async sendSelfie(document: string, file: any): Promise<OutputDTO> {
    const absolutePath = resolve(".");
    const individualId = await this.getUserIndividualId(document);
    return await this.httpClient.post(
      env.CRONOS_BASE_URL + "/register/individual/step6/" + individualId,
      {
        file: fs.createReadStream(absolutePath + "/" + file),
      },
      {
        Authorization: `Bearer ${env.CRONOS_SECRET}`,
        "Content-Type": "multipart/form-data",
      }
    );
  }
}
