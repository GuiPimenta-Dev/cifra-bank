export default interface NationalRechargeRequesterInterface {
  authorize(id: string): Promise<string>;
  reserveBalance(value: number, token: string): Promise<{ receiptformatted: string; transactionId: number }>;
  confirmRecharge(
    transactionId: number,
    token: string
  ): Promise<{ errorCode: string; message: string; status: number }>;
}
