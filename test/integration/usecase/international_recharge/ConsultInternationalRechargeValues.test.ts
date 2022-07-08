import ConsultInternationalValues from "../../../../src/application/usecase/international_recharge/ConsultInternationalValues";
import AuthDTO from "../../../../src/domain/dto/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../../src/infra/http/adapter/AxiosAdapter";
import { getAuth } from "../../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});

test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const internationalRechargeFacade = baasFactory.createInternationalRechargeFacade();
  const nationalRechargeValues = new ConsultInternationalValues(internationalRechargeFacade);
  const { data } = await nationalRechargeValues.execute(509, 48227030, auth);
  expect(data).toHaveProperty("data");
});
