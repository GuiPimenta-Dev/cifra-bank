import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const baasFacade = baasFactory.createCellcoinFacade();
  const consultAvailableCountries = new ConsultAvailableCountries(baasFacade);
  const response = await consultAvailableCountries.execute("41b44ab9a56440.teste.celcoinapi.v5", 1);
  expect(response).toHaveProperty("countries");
});
