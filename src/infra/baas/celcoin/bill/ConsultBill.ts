import OutputDTO from "../../../../domain/dto/application/OutputDTO";
import HttpClientInterface from "../../../../domain/infra/http/HttpClient";
export default class ConsultBill {
  constructor(readonly httpClient: HttpClientInterface) {}

  async consultBill(type: number, digitable: string, token: string): Promise<OutputDTO> {
    const body = {
      barCode: {
        type,
        digitable,
      },
    };
    return await this.httpClient.post(process.env.CELLCOIN_BASE_URL + "/transactions/billpayments/authorize", body, {
      Authorization: `Bearer ${token}`,
    });
  }
}
