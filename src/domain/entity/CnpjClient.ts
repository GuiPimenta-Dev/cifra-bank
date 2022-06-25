import Cnpj from "./Cnpj";
import Phone from "./Phone";

export default class CnpjClient {
  cnpj: Cnpj;
  phone: Phone;
  constructor(readonly id: string, cnpj: string, stateCode: number, countryCode: number, number: number) {
    this.cnpj = new Cnpj(cnpj);
    this.phone = new Phone(stateCode, countryCode, number);
  }

  getCnpj() {
    return this.cnpj.value;
  }

  getPhone() {
    return this.phone.value;
  }
}
