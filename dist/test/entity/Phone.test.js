"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Phone_1 = __importDefault(require("../../src/domain/entity/Phone"));
test("Must throw an error if country code does not have length of 2", function () {
    expect(() => new Phone_1.default(555, 15, 993134307)).toThrowError("Invalid country code");
});
test("Must throw an error if state code does not have length of 2", function () {
    expect(() => new Phone_1.default(55, 150, 993134307)).toThrowError("Invalid state code");
});
test("Must throw an error if number does not have length of 9", function () {
    expect(() => new Phone_1.default(55, 15, 99313430)).toThrowError("Invalid number");
});
