interface PhoneDTO {
  stateCode: number;
  countryCode: number;
  number: number;
}

export default interface MakeNationalRechargeDTO {
  value: number;
  providerId: number;
  phone: PhoneDTO;
}
