import ConsultAvailableCountries from "../../../../src/application/usecase/international_recharge/ConsultAvailableCountries";
import AuthDTO from "../../../../src/domain/dto/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../../src/infra/http/adapter/AxiosAdapter";
import { getAuth } from "../../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});
test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const internationalRechargeFacade = baasFactory.createInternationalRechargeFacade();
  const consultAvailableCountries = new ConsultAvailableCountries(internationalRechargeFacade);
  const { data } = await consultAvailableCountries.execute(1, auth);
  expect(data).toHaveProperty("countries");
});
