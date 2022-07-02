import MakeNationalRecharge from "../../../src/application/usecase/MakeNationalRecharge";
import Broker from "../../../src/infra/broker/Broker";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import FakeMakeNationalRechargeHandler from "../fake/FakeMakeNationalRechargeHandler";
test("Should be able to make a national recharge", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const broker = new Broker();
  const fakeMakeNationalRechargeHandler = new FakeMakeNationalRechargeHandler();
  broker.register(fakeMakeNationalRechargeHandler);
  const makeNationalRecharge = new MakeNationalRecharge(baasFactory, broker);
  const data = {
    id: "41b44ab9a56440.teste.celcoinapi.v5",
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const result = await makeNationalRecharge.execute(data);
  expect(result).toHaveProperty("receipt");
  expect(fakeMakeNationalRechargeHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].document).toBe("46949827881");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].name).toBe("NationalRechargeMade");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0]).toHaveProperty("transactionId");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].value).toBe(15);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].providerId).toBe(2086);
});
