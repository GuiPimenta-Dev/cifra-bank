import env from "../../../env";
import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultAvailableCountries = new ConsultAvailableCountries(baasFactory);
  const response = await consultAvailableCountries.execute(1, env.TOKEN);
  expect(response).toHaveProperty("countries");
});
