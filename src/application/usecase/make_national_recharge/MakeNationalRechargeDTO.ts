export interface PhoneDTO {
  stateCode: number;
  countryCode: number;
  number: number;
}

export default interface MakeNationalRechargeDTO {
  id: string;
  value: number;
  document: string;
  providerId: number;
  phone: PhoneDTO;
}
