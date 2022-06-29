interface PhoneDTO {
  stateCode: number;
  countryCode: number;
  number: number;
}

export interface NationalRechargeDTO {
  id: string;
  document: string;
  value: number;
  providerId: number;
  phone: PhoneDTO;
}
