"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Phone {
    constructor(countryCode, stateCode, number) {
        this.countryCode = countryCode;
        this.stateCode = stateCode;
        this.number = number;
        if (!this.hasCorrectLength(countryCode, 2))
            throw new Error("Invalid country code");
        if (!this.hasCorrectLength(stateCode, 2))
            throw new Error("Invalid state code");
        if (!this.hasCorrectLength(number, 9))
            throw new Error("Invalid number");
        this.value = { stateCode, countryCode, number };
    }
    hasCorrectLength(value, digits) {
        return value.toString().length === digits;
    }
}
exports.default = Phone;
