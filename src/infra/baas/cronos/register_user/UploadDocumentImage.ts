import fs from "fs";
import { resolve } from "path";

import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import UploadDocumentImageDTO from "../../../../domain/dto/usecase/UploadDocumentImageDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
import User from "./User";

export default class UploadDocumentImage extends User {
  constructor(httpClient: HttpClientInterface) {
    super(httpClient);
  }

  async sendImage(input: UploadDocumentImageDTO): Promise<OutputDTO> {
    const { document, documentType, imageType, file } = input;
    const individualId = await this.getUserIndividualId(document);

    const absolutePath = resolve(".");
    const body = {
      document_type: documentType,
      image_type: imageType,
      file: fs.createReadStream(absolutePath + "/" + file),
    };
    return await this.httpClient.post(
      process.env.CRONOS_BASE_URL + "/register/individual/step3/" + individualId,
      body,
      {
        Authorization: `Bearer ${process.env.CRONOS_SECRET}`,
        "Content-Type": "multipart/form-data",
      }
    );
  }
}
