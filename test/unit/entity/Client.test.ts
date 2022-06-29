import Client from "../../../src/domain/entity/Client";

test("Should be able to create a client with CPF", async () => {
  const client = new Client("15579226756", 55, 15, 993134307);
  expect(client.getDocument()).toBe("15579226756");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});

it("Should be able to create a client with CNPJ", () => {
  const client = new Client("43162287000169", 55, 15, 993134307);
  expect(client.getDocument()).toBe("43162287000169");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});

it("Should throw an error if document is invalid", () => {
  expect(() => new Client("1557", 55, 15, 993134307)).toThrowError("Invalid Document!");
});
