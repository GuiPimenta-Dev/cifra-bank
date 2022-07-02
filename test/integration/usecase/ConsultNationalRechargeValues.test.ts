import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import CellcoinFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const cellcoinFactory = new CellcoinFactory(httpClient);
  const nationalRechargeValues = new ConsultNationalRechargeValues(cellcoinFactory);
  const response = await nationalRechargeValues.execute("41b44ab9a56440.teste.celcoinapi.v5", 11, 2125);
  expect(response).toHaveProperty("values");
});
