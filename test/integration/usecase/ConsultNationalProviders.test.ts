import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultNationalProviders = new ConsultNationalProviders(baasFactory);
  const response = await consultNationalProviders.execute("41b44ab9a56440.teste.celcoinapi.v5", 13);
  expect(response).toHaveProperty("providers");
});
