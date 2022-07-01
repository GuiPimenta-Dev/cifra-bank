import NationalPhone from "../../../src/domain/entity/NationalPhone";

test("Must create a new national phone", function () {
  const { value } = new NationalPhone(55, 15, 993134307);
  expect(value).toEqual({ countryCode: 55, number: 993134307, stateCode: 15 });
});

test("Must throw an error if country code does not have length of 2", function () {
  expect(() => new NationalPhone(555, 15, 993134307)).toThrowError("Invalid country code");
});

test("Must throw an error if state code does not have length of 2", function () {
  expect(() => new NationalPhone(55, 150, 993134307)).toThrowError("Invalid state code");
});

test("Must throw an error if number does not have length of 9", function () {
  expect(() => new NationalPhone(55, 15, 99313430)).toThrowError("Invalid number");
});
