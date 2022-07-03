import env from "../../../env";
import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultNationalRechargeValues(baasFactory);
  const response = await nationalRechargeValues.execute(11, 2125, env.TOKEN);
  expect(response).toHaveProperty("values");
});
