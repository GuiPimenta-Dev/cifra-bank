import { hasCorrectLength } from "../service/Validators";

export default class InternationalPhone {
  value: { countryCode: number; number: number };

  constructor(countryCode: number, number: number) {
    if (!hasCorrectLength(countryCode, 2)) throw new Error("Invalid country code");
    if (!hasCorrectLength(number, 8)) throw new Error("Invalid number");
    this.value = { countryCode, number };
  }
}
