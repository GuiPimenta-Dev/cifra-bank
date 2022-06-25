import Cpf from "./Cpf";
import Phone from "./Phone";

export default class CpfClient {
  cpf: Cpf;
  phone: Phone;

  constructor(readonly id: string, cpf: string, stateCode: number, countryCode: number, number: number) {
    this.cpf = new Cpf(cpf);
    this.phone = new Phone(stateCode, countryCode, number);
  }

  getCpf() {
    return this.cpf.value;
  }

  getPhone() {
    return this.phone.value;
  }
}
