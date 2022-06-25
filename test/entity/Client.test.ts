import Client from "../../src/domain/entity/Client";

test("Must create a new Client", function () {
  const client = new Client("41b44ab9a56440.teste.celcoinapi.v5", "15579226756", 55, 15, 993134307);
  expect(client.id).toBe("41b44ab9a56440.teste.celcoinapi.v5");
  expect(client.getCpf()).toBe("15579226756");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});
