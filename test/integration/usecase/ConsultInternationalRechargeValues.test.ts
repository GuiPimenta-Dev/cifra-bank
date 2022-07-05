import env from "../../../env";
import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultInternationalRechargeValues(baasFactory);
  const response = await nationalRechargeValues.execute(509, 48227030, env.TOKEN);
  expect(response).toHaveProperty("data");
});
