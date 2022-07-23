import ConsultNationalValues from "../../../../src/application/usecase/national_recharge/ConsultNationalValues";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("Should be able to consult national recharge values", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockGet({ value: [] });
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeFacade = baasFactory.createNationalRechargeFacade();
  const nationalRechargeValues = new ConsultNationalValues(nationalRechargeFacade);
  const { data } = await nationalRechargeValues.execute(11, 2125, fakeAuth());
  expect(data).toHaveProperty("values");
});
