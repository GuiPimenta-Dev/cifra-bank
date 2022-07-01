import InternationalPhone from "../../../src/domain/entity/InternationalPhone";

test("Must create a new national phone", function () {
  const { value } = new InternationalPhone(555, 99313430);
  expect(value).toEqual({ countryCode: 555, number: 99313430 });
});

test("Must throw an error if country code does not have length of 3", function () {
  expect(() => new InternationalPhone(5555, 99313430)).toThrowError("Invalid country code");
});

test("Must throw an error if number does not have length of 8", function () {
  expect(() => new InternationalPhone(555, 993134301)).toThrowError("Invalid number");
});
