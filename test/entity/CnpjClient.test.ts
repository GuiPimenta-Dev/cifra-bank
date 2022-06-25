import CnpjClient from "../../src/domain/entity/CnpjClient";

it("Should creat a new CNPJ Client", () => {
  const client = new CnpjClient("41b44ab9a56440.teste.celcoinapi.v5", "43162287000169", 55, 15, 993134307);
  expect(client.id).toBe("41b44ab9a56440.teste.celcoinapi.v5");
  expect(client.getCnpj()).toBe("43162287000169");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});
