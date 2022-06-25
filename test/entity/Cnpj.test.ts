import Cnpj from "../../src/domain/entity/Cnpj";

test("Must validate a cnpj", function () {
  const cnpj = new Cnpj("43.162.287/0001-69");
  expect(cnpj).toBeTruthy();
});

test("Must clean a cnpj", function () {
  const { value } = new Cnpj("43.162.287/0001-69");
  expect(value).toBe("43162287000169");
});

test("Must throw an error if cnpj is too small", function () {
  expect(() => new Cnpj("43.162.287/0001-6")).toThrow(new Error("Invalid cnpj"));
});

test("Must throw an error if cnpj is too big", function () {
  expect(() => new Cnpj("43.162.287/0001-690")).toThrow(new Error("Invalid cnpj"));
});

test("Must throw an error if cnpj is blocked", function () {
  expect(() => new Cnpj("11.111.111/1111-11")).toThrow(new Error("Invalid cnpj"));
});

test("Must throw an error if cnpj is invalid", function () {
  expect(() => new Cnpj("43.162.287/0001-89")).toThrow(new Error("Invalid cnpj"));
});
