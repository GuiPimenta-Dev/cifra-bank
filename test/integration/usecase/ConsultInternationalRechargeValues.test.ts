import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import getToken from "../utils/getToken";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});

test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultInternationalRechargeValues(baasFactory);
  const { data } = await nationalRechargeValues.execute(509, 48227030, token);
  expect(data).toHaveProperty("data");
});
