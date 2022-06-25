"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../../src/domain/entity/Client"));
test("Must create a new Client", function () {
  const Client = new Client_1.default("41b44ab9a56440.teste.celcoinapi.v5", "15579226756", 55, 15, 993134307);
  expect(Client.id).toBe("41b44ab9a56440.teste.celcoinapi.v5");
  expect(Client.getCpf()).toBe("15579226756");
  expect(Client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});
