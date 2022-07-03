import Cnpj from "./Cnpj";
import Cpf from "./Cpf";

export default class Document {
  private document: Cpf | Cnpj;

  constructor(document: string) {
    this.document = this.validateDocument(document);
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
}
