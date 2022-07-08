import ConsultNationalValues from "../../../../src/application/usecase/national_recharge/ConsultNationalValues";
import AuthDTO from "../../../../src/domain/dto/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../../src/infra/http/adapter/AxiosAdapter";
import { getAuth } from "../../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});
test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeFacade = baasFactory.createNationalRechargeFacade();
  const nationalRechargeValues = new ConsultNationalValues(nationalRechargeFacade);
  const { data } = await nationalRechargeValues.execute(11, 2125, auth);
  expect(data).toHaveProperty("values");
});
