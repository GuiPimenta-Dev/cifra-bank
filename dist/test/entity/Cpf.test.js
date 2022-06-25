"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../../src/domain/entity/Cpf"));
test("Must validate a cpf", function () {
    const cpf = new Cpf_1.default("935.411.347-80");
    expect(cpf).toBeTruthy();
});
test("Must throw an error if cpf is invalid", function () {
    expect(() => new Cpf_1.default("123.456.789-99")).toThrow(new Error("Invalid cpf"));
});
test("Must throw an error if all digits are equal", function () {
    expect(() => new Cpf_1.default("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});
test("Must throw an error if cpf is too big", function () {
    expect(() => new Cpf_1.default("123.456.789-1000")).toThrow(new Error("Invalid cpf"));
});
test("Must throw an error if cpf is too small", function () {
    expect(() => new Cpf_1.default("123.456")).toThrow(new Error("Invalid cpf"));
});
