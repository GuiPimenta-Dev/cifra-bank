import HttpClientInterface from "../../../../domain/infra/http/HttpClient";

const BOUNDARY = "---011000010111000001101001";
const HEADERS = { "content-type": `multipart/form-data; boundary=${BOUNDARY}` };

export default class Authorize {
  constructor(private httpClient: HttpClientInterface) {}

  async authorize(id: string): Promise<any> {
    const authorization = {
      client_id: id,
      grant_type: "client_credentials",
      client_secret: process.env.CELLCOIN_SECRET,
    };
    const body = this.parseBody(authorization);
    const { data } = await this.httpClient.post(process.env.CELLCOIN_BASE_URL + "/token", body, HEADERS);
    return data.access_token;
  }

  private parseBody(data: any) {
    let parsedData = "";
    for (let key in data) {
      parsedData += `--${BOUNDARY}\r\n`;
      parsedData += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
      parsedData += `${data[key]}\r\n`;
    }
    parsedData += `--${BOUNDARY}--\r\n`;
    return parsedData;
  }
}
