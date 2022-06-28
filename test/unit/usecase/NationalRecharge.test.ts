import NationalRecharge from "../../../src/application/usecase/national_recharge/NationalRecharge";
import FakeNationalRechargeRequester from "../../fake/FakeNationalRechargeRequester";
test("Should be able to reserve a national balance", async () => {
  const fakeNationalRequester = new FakeNationalRechargeRequester();
  const nationalRecharge = new NationalRecharge(fakeNationalRequester);
  const result = await nationalRecharge.execute("12345678910", 15);
  const expectedResults = { receipt: "SOME_RECEIPT", errorCode: "000", message: "SUCESSO", status: 0 };
  expect(result).toEqual(expectedResults);
});
