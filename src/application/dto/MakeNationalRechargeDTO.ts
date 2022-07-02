interface PhoneDTO {
  stateCode: number;
  countryCode: number;
  number: number;
}

export default interface MakeNationalRechargeDTO {
  value: number;
  document: string;
  providerId: number;
  phone: PhoneDTO;
}
