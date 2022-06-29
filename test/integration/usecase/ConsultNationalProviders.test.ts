import ConsultNationalProviders from "../../../src/application/usecase/consult_national_providers/ConsultNationalProviders";
import AxiosAdapter from "../../../src/infra/adapter/AxiosAdapter";
import RequesterFactory from "../../../src/infra/factory/RequesterFactory";
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const requesterFactory = new RequesterFactory(httpClient);
  const consultNationalProviders = new ConsultNationalProviders(requesterFactory);
  const response = await consultNationalProviders.execute("41b44ab9a56440.teste.celcoinapi.v5", 13);
  expect(response).toHaveProperty("providers");
});
