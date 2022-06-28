import NationalRechargeRequesterInterface from "../../src/domain/requester/NationalRechargeRequester";
import FakeAuthorizerRequester from "./FakeAuthorizeRequester";

export default class FakeNationalRequester
  extends FakeAuthorizerRequester
  implements NationalRechargeRequesterInterface
{
  async reserveBalance(value: number, token: string): Promise<{ receiptformatted: string; transactionId: number }> {
    return {
      receiptformatted: "SOME_RECEIPT",
      transactionId: 816298929,
    };
  }

  async confirmRecharge(transactionId: number): Promise<{ errorCode: string; message: string; status: number }> {
    return {
      errorCode: "000",
      message: "SUCESSO",
      status: 0,
    };
  }
}
