import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
export default class Authorize {
  constructor(private httpClient: HttpClientInterface) {}

  async getCode(username?: string, password?: string): Promise<any> {
    const body = {
      client_id: username,
      redirect_uri: process.env.ARBI_REDIRECT_URI,
    };
    const headers = {
      auth: {
        username,
        password,
      },
    };
    const response = await this.httpClient.post(process.env.ARBI_BASE_URL + "/oauth/grant-code", body, headers);
    const code = response.data.redirect_uri.split("code=")[1];
    return code;
  }

  async authorize(code: string, username?: string, password?: string): Promise<any> {
    const body = {
      grant_type: "authorization_code",
      code,
    };
    const headers = {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    };
    const { data } = await this.httpClient.post(process.env.ARBI_BASE_URL + "/oauth/access-token", body, headers);
    return data.access_token;
  }
}
