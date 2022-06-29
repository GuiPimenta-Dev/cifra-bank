import Cpf from "../../../src/domain/entity/Cpf";

test("Must validate a cpf", function () {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Must clean a cpf", function () {
  const { value } = new Cpf("935.411.347-80");
  expect(value).toBe("93541134780");
});

test("Value must be null if validators digits are invalid", function () {
  const { value } = new Cpf("935.411.347-81");
  expect(value).toBe(null);
});

test("Value must be null if all digits are equal", function () {
  const { value } = new Cpf("111.111.111-11");
  expect(value).toBe(null);
});

test("Value must be null if cpf is too big", function () {
  const { value } = new Cpf("935.411.347-800");
  expect(value).toBe(null);
});

test("Value must be null if cpf is too small", function () {
  const { value } = new Cpf("935.411.347-8");
  expect(value).toBe(null);
});
