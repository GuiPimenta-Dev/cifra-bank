interface PhoneDTO {
  countryCode: number;
  number: number;
}

export default interface MakeInternationalRechargeDTO {
  value: number;
  productId: number;
  phone: PhoneDTO;
}
