import AuthDTO from "../../../src/application/dto/AuthDTO";
import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import { getAuth } from "../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});
test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultAvailableCountries = new ConsultAvailableCountries(baasFactory);
  const { data } = await consultAvailableCountries.execute(1, auth);
  expect(data).toHaveProperty("countries");
});
