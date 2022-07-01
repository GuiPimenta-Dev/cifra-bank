import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import CellcoinFacade from "../../../src/infra/facade/CellcoinFacade";
import CellcoinFactory from "../../../src/infra/factory/CellcoinFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const cellcoinFactory = new CellcoinFactory(httpClient);
  const cellcoinFacade = new CellcoinFacade(cellcoinFactory);
  const nationalRechargeValues = new ConsultNationalRechargeValues(cellcoinFacade);
  const response = await nationalRechargeValues.execute("41b44ab9a56440.teste.celcoinapi.v5", 11, 2125);
  expect(response).toHaveProperty("values");
});
