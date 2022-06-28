import NationalRecharge from "../../../src/application/usecase/national_recharge/NationalRecharge";
import AxiosAdapter from "../../../src/infra/adapter/AxiosAdapter";
import RequesterFactory from "../../../src/infra/factory/RequesterFactory";
test("Should be able to reserve a national balance", async () => {
  const httpClient = new AxiosAdapter();
  const requesterFactory = new RequesterFactory(httpClient);
  const nationalRecharge = new NationalRecharge(requesterFactory);
  const result = await nationalRecharge.execute("41b44ab9a56440.teste.celcoinapi.v5", 15);
  expect(result).toHaveProperty("receipt");
});
