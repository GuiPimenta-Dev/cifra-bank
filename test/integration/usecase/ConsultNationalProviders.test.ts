import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import getToken from "../utils/getToken";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultNationalProviders = new ConsultNationalProviders(baasFactory);
  const response = await consultNationalProviders.execute(13, token);
  expect(response).toHaveProperty("providers");
});
