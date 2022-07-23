interface PhoneDTO {
  countryCode?: number;
  stateCode: number;
  number: number;
}

export default interface RegisterUserDTO {
  document: string;
  name: string;
  username: string;
  email: string;
  phone: PhoneDTO;
}
