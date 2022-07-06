import AuthDTO from "../../../src/application/dto/AuthDTO";
import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import { getAuth } from "../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultNationalProviders = new ConsultNationalProviders(baasFactory);
  const { data } = await consultNationalProviders.execute(13, auth);
  expect(data).toHaveProperty("providers");
});
