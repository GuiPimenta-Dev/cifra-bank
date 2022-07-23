import ConsultNationalProviders from "../../../../src/application/usecase/national_recharge/ConsultNationalProviders";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to consult providers", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockGet({ providers: [] });
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeFacade = baasFactory.createNationalRechargeFacade();
  const consultNationalProviders = new ConsultNationalProviders(nationalRechargeFacade);
  const { data } = await consultNationalProviders.execute(13, fakeAuth());
  expect(data).toHaveProperty("providers");
});
