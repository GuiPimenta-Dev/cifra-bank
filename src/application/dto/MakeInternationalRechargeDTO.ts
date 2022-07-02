interface PhoneDTO {
  countryCode: number;
  number: number;
}

export default interface MakeInternationalRechargeDTO {
  value: number;
  document: string;
  productId: number;
  phone: PhoneDTO;
}
