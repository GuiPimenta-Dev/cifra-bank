"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const Phone_1 = __importDefault(require("./Phone"));
class Client {
  constructor(id, cpf, stateCode, countryCode, number) {
    this.id = id;
    this.cpf = new Cpf_1.default(cpf);
    this.phone = new Phone_1.default(stateCode, countryCode, number);
  }
  getCpf() {
    return this.cpf.value;
  }
  getPhone() {
    return this.phone.value;
  }
}
exports.default = Client;
