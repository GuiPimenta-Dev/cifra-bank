interface PhoneDTO {
  countryCode: number;
  number: number;
}

export default interface MakeInternationalRechargeDTO {
  id: string;
  value: number;
  document: string;
  productId: number;
  phone: PhoneDTO;
}
