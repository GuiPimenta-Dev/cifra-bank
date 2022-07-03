import Document from "../../../src/domain/entity/Document";

test("Should be able to create a client with CPF and national phone", async () => {
  const client = new Document("15579226756");
  expect(client.getDocument()).toBe("15579226756");
});

it("Should be able to create a client with CNPJ", () => {
  const client = new Document("43162287000169");
  expect(client.getDocument()).toBe("43162287000169");
});

it("Should throw an error if document is invalid", () => {
  expect(() => new Document("1557")).toThrowError("Invalid Document!");
});
