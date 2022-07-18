import ConsultAvailableCountries from "../../../../src/application/usecase/international_recharge/ConsultAvailableCountries";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/fake/httpclient/FakeHttpClient";
import { fakeAuth } from "../../../utils/fixtures";

test("It Should be able to consult all available countries", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockGet({
    countrys: [],
  });
  const baasFactory = new BaasFactory(httpClient);
  const internationalRechargeFacade = baasFactory.createInternationalRechargeFacade();
  const consultAvailableCountries = new ConsultAvailableCountries(internationalRechargeFacade);
  const { data } = await consultAvailableCountries.execute(1, fakeAuth());
  expect(data).toHaveProperty("countries");
});
