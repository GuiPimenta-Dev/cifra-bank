import DocumentValidator from "../service/DocumentValidator";

export default class Cnpj extends DocumentValidator {
  value: string;
  constructor(value: string) {
    super();
    if (!this.validate(value)) throw new Error("Invalid cnpj");
    this.value = this.clean(value);
  }

  private validate(cnpj: any) {
    if (!cnpj) return false;
    cnpj = this.clean(cnpj);
    if (!this.hasCorrectLength(cnpj, 14)) return false;
    if (this.isBlocked(cnpj)) return false;
    const digit1 = this.calculateDigit(cnpj, 12);
    const digit2 = this.calculateDigit(cnpj, 13);
    const calculatedDigit = `${digit1}${digit2}`;
    const actualDigit = cnpj.slice(12);
    return actualDigit === calculatedDigit;
  }

  calculateDigit(value: string, factor: number) {
    let numbers = value.substring(0, factor);
    let pos = factor - 7;
    let total = 0;
    for (let i = factor; i >= 1; i--) {
      total += +numbers.charAt(factor - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}
