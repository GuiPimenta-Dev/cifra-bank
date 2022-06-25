import Phone from "../../src/domain/entity/Phone";

test("Must throw an error if country code does not have length of 2", function () {
  expect(() => new Phone(555, 15, 993134307)).toThrowError("Invalid country code");
});

test("Must throw an error if state code does not have length of 2", function () {
  expect(() => new Phone(55, 150, 993134307)).toThrowError("Invalid state code");
});

test("Must throw an error if number does not have length of 9", function () {
  expect(() => new Phone(55, 15, 99313430)).toThrowError("Invalid number");
});
