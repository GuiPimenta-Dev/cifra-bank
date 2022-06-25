"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
class Client {
  constructor(id, name, cpf) {
    this.id = id;
    this.name = name;
    this.cpf = new Cpf_1.default(cpf);
  }
  getCpf() {
    return this.cpf.value;
  }
}
exports.default = Client;
