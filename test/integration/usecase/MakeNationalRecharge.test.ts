import TokenDTO from "../../../src/application/dto/TokenDTO";
import MakeNationalRecharge from "../../../src/application/usecase/MakeNationalRecharge";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import Broker from "../../../src/infra/broker/Broker";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";
import FakeMakeNationalRechargeHandler from "../utils/fake/handler/FakeMakeNationalRechargeHandler";
import { getToken } from "../utils/fixtures";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});

test("Should be able to make a national recharge", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const broker = new Broker();
  const fakeMakeNationalRechargeHandler = new FakeMakeNationalRechargeHandler();
  broker.register(fakeMakeNationalRechargeHandler);
  const makeNationalRecharge = new MakeNationalRecharge(baasFactory, broker);
  const body = {
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const { data } = await makeNationalRecharge.execute(body, token);
  expect(data).toHaveProperty("receipt");
  expect(fakeMakeNationalRechargeHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].document).toBe("46949827881");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].name).toBe("NationalRechargeMade");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0]).toHaveProperty("transactionId");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].value).toBe(15);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].providerId).toBe(2086);
});
