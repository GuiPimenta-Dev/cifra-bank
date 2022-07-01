import { clean, hasCorrectLength, isBlocked } from "../service/Validators";

export default class Cpf {
  value: string;

  constructor(value: string) {
    this.value = this.validate(value) ? clean(value) : "";
  }

  private validate(cpf: string) {
    cpf = clean(cpf);
    if (!hasCorrectLength(cpf, 11)) return false;
    if (isBlocked(cpf)) return false;
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
