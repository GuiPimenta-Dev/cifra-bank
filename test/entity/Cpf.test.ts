import Cpf from "../../src/domain/entity/Cpf";

test("Must validate a cpf", function () {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Must clean a cpf", function () {
  const { value } = new Cpf("935.411.347-80");
  expect(value).toBe("93541134780");
});

test("Must throw an error if cpf is invalid", function () {
  expect(() => new Cpf("123.456.789-99")).toThrow(new Error("Invalid cpf"));
});

test("Must throw an error if all digits are equal", function () {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid cpf"));
});

test("Must throw an error if cpf is too big", function () {
  expect(() => new Cpf("123.456.789-1000")).toThrow(new Error("Invalid cpf"));
});

test("Must throw an error if cpf is too small", function () {
  expect(() => new Cpf("123.456")).toThrow(new Error("Invalid cpf"));
});
