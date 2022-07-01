import Client from "../../../src/domain/entity/Client";
import NationalPhone from "../../../src/domain/entity/NationalPhone";

test("Should be able to create a client with CPF and national phone", async () => {
  const phone = new NationalPhone(55, 15, 993134307);
  const client = new Client("15579226756", phone);
  expect(client.getDocument()).toBe("15579226756");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});

it("Should be able to create a client with CNPJ", () => {
  const phone = new NationalPhone(55, 15, 993134307);
  const client = new Client("43162287000169", phone);
  expect(client.getDocument()).toBe("43162287000169");
  expect(client.getPhone()).toEqual({ stateCode: 15, countryCode: 55, number: 993134307 });
});

it("Should throw an error if document is invalid", () => {
  const phone = new NationalPhone(55, 15, 993134307);
  expect(() => new Client("1557", phone)).toThrowError("Invalid Document!");
});
