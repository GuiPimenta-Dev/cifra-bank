import { hasCorrectLength } from "../service/Validators";

export default class NationalPhone {
  value: { countryCode: number; stateCode: number; number: number };

  constructor(countryCode: number, stateCode: number, number: number) {
    if (!hasCorrectLength(countryCode, 2)) throw new Error("Invalid country code");
    if (!hasCorrectLength(stateCode, 2)) throw new Error("Invalid state code");
    if (!hasCorrectLength(number, 9)) throw new Error("Invalid number");
    this.value = { stateCode, countryCode, number };
  }
}
