interface PhoneDTO {
  stateCode: number;
  countryCode: number;
  number: number;
}

interface ReserveBalanceDTO {
  value: number;
  document: string;
  providerId: number;
  phone: PhoneDTO;
}

interface NationalRechargeRequesterInterface {
  authorize(id: string): Promise<string>;
  reserveBalance(input: ReserveBalanceDTO, token: string): Promise<{ receiptformatted: string; transactionId: number }>;
  confirmRecharge(
    transactionId: number,
    token: string
  ): Promise<{ errorCode: string; message: string; status: number }>;
}

export { PhoneDTO, ReserveBalanceDTO, NationalRechargeRequesterInterface };
