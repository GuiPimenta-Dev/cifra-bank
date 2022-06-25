import DocumentValidator from "../service/DocumentValidator";

export default class Cpf extends DocumentValidator {
  value: string;

  constructor(value: string) {
    super();
    if (!this.validate(value)) throw new Error("Invalid cpf");
    this.value = this.clean(value);
  }

  private validate(cpf: string) {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (!this.hasCorrectLength(cpf, 11)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10);
    const digit2 = this.calculateDigit(cpf, 11);
    const calculatedDigit = `${digit1}${digit2}`;
    const actualDigit = cpf.slice(9);
    return actualDigit === calculatedDigit;
  }

  calculateDigit(value: string, factor: number) {
    let total = 0;
    for (const digit of value) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}
