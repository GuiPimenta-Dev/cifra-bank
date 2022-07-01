import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import CellcoinFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const cellcoinFactory = new CellcoinFactory(httpClient);
  const cellcoinFacade = cellcoinFactory.createCellcoinBaas();
  const consultNationalProviders = new ConsultNationalProviders(cellcoinFacade);
  const response = await consultNationalProviders.execute("41b44ab9a56440.teste.celcoinapi.v5", 13);
  expect(response).toHaveProperty("providers");
});
