import Cnpj from "../../../src/domain/entity/Cnpj";

test("Must validate a cnpj", function () {
  const cnpj = new Cnpj("43.162.287/0001-69");
  expect(cnpj).toBeTruthy();
});

test("Must clean a cnpj", function () {
  const { value } = new Cnpj("43.162.287/0001-69");
  expect(value).toBe("43162287000169");
});

test("Value must be null if cnpj is too small", function () {
  const { value } = new Cnpj("43.162.287/0001-6");
  expect(value).toBe(null);
});

test("Value must be null if cnpj is too big", function () {
  const { value } = new Cnpj("43.162.287/0001-690");
  expect(value).toBe(null);
});

test("Value must be null if all cnpj digits are equal", function () {
  const { value } = new Cnpj("11.111.111/1111-11");
  expect(value).toBe(null);
});

test("Value must be null if cnpj is invalid", function () {
  const { value } = new Cnpj("43.162.287/0001-89");
  expect(value).toBe(null);
});
