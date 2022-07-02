import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultInternationalRechargeValues(baasFactory);
  const response = await nationalRechargeValues.execute("41b44ab9a56440.teste.celcoinapi.v5", 509, 48227030);
  expect(response).toHaveProperty("data");
});
