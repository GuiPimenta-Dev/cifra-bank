export default class Phone {
  value: { stateCode: number; countryCode: number; number: number };

  constructor(readonly countryCode: number, readonly stateCode: number, readonly number: number) {
    if (!this.hasCorrectLength(countryCode, 2)) throw new Error("Invalid country code");
    if (!this.hasCorrectLength(stateCode, 2)) throw new Error("Invalid state code");
    if (!this.hasCorrectLength(number, 9)) throw new Error("Invalid number");
    this.value = { stateCode, countryCode, number };
  }

  private hasCorrectLength(value: number, digits: number) {
    return value.toString().length === digits;
  }
}
