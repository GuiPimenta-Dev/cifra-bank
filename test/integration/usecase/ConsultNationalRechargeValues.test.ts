import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import { getToken } from "../utils/fixtures";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});
test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultNationalRechargeValues(baasFactory);
  const { data } = await nationalRechargeValues.execute(11, 2125, token);
  expect(data).toHaveProperty("values");
});
