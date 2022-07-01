import Cnpj from "./Cnpj";
import Cpf from "./Cpf";
import InternationalPhone from "./InternationalPhone";
import NationalPhone from "./NationalPhone";

export default class Client {
  private document: Cpf | Cnpj;
  private phone: NationalPhone | InternationalPhone;

  constructor(document: string, phone: NationalPhone | InternationalPhone) {
    this.document = this.validateDocument(document);
    this.phone = phone;
  }

  private validateDocument(document: string) {
    const cpf = new Cpf(document);
    if (cpf.value) return cpf;
    const cnpj = new Cnpj(document);
    if (cnpj.value) return cnpj;
    throw new Error("Invalid Document!");
  }

  getDocument(): string {
    return this.document.value;
  }

  getPhone() {
    return this.phone.value;
  }
}
