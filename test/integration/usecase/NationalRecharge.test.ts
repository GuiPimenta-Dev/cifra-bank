import NationalRecharge from "../../../src/application/usecase/national_recharge/NationalRecharge";
import AxiosAdapter from "../../../src/infra/adapter/AxiosAdapter";
import RequesterFactory from "../../../src/infra/factory/RequesterFactory";
test("Should be able to make a national recharge", async () => {
  const httpClient = new AxiosAdapter();
  const requesterFactory = new RequesterFactory(httpClient);
  const nationalRecharge = new NationalRecharge(requesterFactory);
  const data = {
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const result = await nationalRecharge.execute("41b44ab9a56440.teste.celcoinapi.v5", data);
  expect(result).toHaveProperty("receipt");
});
