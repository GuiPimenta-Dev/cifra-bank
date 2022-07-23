import ConsultInternationalValues from "../../../../src/application/usecase/international_recharge/ConsultInternationalValues";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("Should be able to consult international recharge values", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockGet({
    data: {},
  });
  const baasFactory = new BaasFactory(httpClient);
  const internationalRechargeFacade = baasFactory.createInternationalRechargeFacade();
  const nationalRechargeValues = new ConsultInternationalValues(internationalRechargeFacade);
  const { data } = await nationalRechargeValues.execute(509, 48227030, fakeAuth());
  expect(data).toHaveProperty("data");
});
