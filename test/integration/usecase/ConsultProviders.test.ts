import ConsultProviders from "../../../src/application/usecase/consult_providers/ConsultProviders";
import AxiosAdapter from "../../../src/infra/adapter/AxiosAdapter";
import RequesterFactory from "../../../src/infra/factory/RequesterFactory";
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const requesterFactory = new RequesterFactory(httpClient);
  const consultProviders = new ConsultProviders(requesterFactory);
  const response = await consultProviders.execute("41b44ab9a56440.teste.celcoinapi.v5", 13);
  expect(response).toHaveProperty("providers");
});
