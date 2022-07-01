import { clean, hasCorrectLength, isBlocked } from "../service/Validators";

export default class Cnpj {
  value: string;

  constructor(value: string) {
    this.value = this.validate(value) ? clean(value) : "";
  }

  private validate(cnpj: any) {
    cnpj = clean(cnpj);
    if (!hasCorrectLength(cnpj, 14)) return false;
    if (isBlocked(cnpj)) return false;
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
