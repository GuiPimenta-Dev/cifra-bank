import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import CellcoinFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const cellcoinFactory = new CellcoinFactory(httpClient);
  const cellcoinFacade = cellcoinFactory.createCellcoinFacade();
  const nationalRechargeValues = new ConsultInternationalRechargeValues(cellcoinFacade);
  const response = await nationalRechargeValues.execute("41b44ab9a56440.teste.celcoinapi.v5", 509, 48227030);
  expect(response).toHaveProperty("data");
});
