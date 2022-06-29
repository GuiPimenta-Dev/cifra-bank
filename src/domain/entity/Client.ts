import Cnpj from "./Cnpj";
import Cpf from "./Cpf";
import Phone from "./Phone";

export default class Client {
  document: Cpf | Cnpj;
  phone: Phone;

  constructor(document: string, stateCode: number, countryCode: number, number: number) {
    this.document = this.validateDocument(document);
    this.phone = new Phone(stateCode, countryCode, number);
  }

  private validateDocument(document: string) {
    const cpf = new Cpf(document);
    if (cpf.value) return cpf;
    const cnpj = new Cnpj(document);
    if (cnpj.value) return cnpj;
    throw new Error("Invalid Document!");
  }

  getDocument() {
    return this.document.value;
  }

  getPhone() {
    return this.phone.value;
  }
}
