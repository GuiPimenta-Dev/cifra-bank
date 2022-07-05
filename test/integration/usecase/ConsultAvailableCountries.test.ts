import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import getToken from "../utils/getToken";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});
test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultAvailableCountries = new ConsultAvailableCountries(baasFactory);
  const response = await consultAvailableCountries.execute(1, token);
  expect(response).toHaveProperty("countries");
});
