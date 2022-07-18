import MakeNationalRecharge from "../../../../src/application/usecase/national_recharge/MakeNationalRecharge";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import Broker from "../../../../src/infra/broker/Broker";
import FakeHandler from "../../../utils/fake/broker/FakeHandler";
import FakeHttpClient from "../../../utils/fake/httpclient/FakeHttpClient";
import { fakeAuth } from "../../../utils/Fixtures";

test("Should be able to make a national recharge", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost({ receipt: "fake-receipt", transactionId: 123456789 });
  const baasFactory = new BaasFactory(httpClient);
  const broker = new Broker();
  const fakeHandler = new FakeHandler();
  const nationalRechargeFacade = baasFactory.createNationalRechargeFacade();
  fakeHandler.setName("NationalRechargeMade");
  broker.register(fakeHandler);
  const makeNationalRecharge = new MakeNationalRecharge(nationalRechargeFacade, broker);
  const body = {
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const { data } = await makeNationalRecharge.execute(body, fakeAuth());
  expect(data.receipt).toBe("fake-receipt");
  expect(fakeHandler.fakeRepository).toHaveLength(1);
  expect(fakeHandler.fakeRepository[0].document).toBe("35914746817");
  expect(fakeHandler.fakeRepository[0].name).toBe("NationalRechargeMade");
  expect(fakeHandler.fakeRepository[0].transactionId).toBe(123456789);
  expect(fakeHandler.fakeRepository[0].value).toBe(15);
  expect(fakeHandler.fakeRepository[0].providerId).toBe(2086);
});
