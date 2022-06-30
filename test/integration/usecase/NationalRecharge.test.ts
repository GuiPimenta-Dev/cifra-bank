import NationalRecharge from "../../../src/application/usecase/NationalRecharge";
import AxiosAdapter from "../../../src/infra/adapter/AxiosAdapter";
import Broker from "../../../src/infra/broker/Broker";
import RequesterFactory from "../../../src/infra/factory/RequesterFactory";
import FakeNationalRechargeConfirmedHandler from "./fake/handler/FakeNationalRechargeConfirmedHandler";
test("Should be able to make a national recharge", async () => {
  const httpClient = new AxiosAdapter();
  const requesterFactory = new RequesterFactory(httpClient);
  const broker = new Broker();
  const fakeNationalRechargeConfirmedHandler = new FakeNationalRechargeConfirmedHandler();
  broker.register(fakeNationalRechargeConfirmedHandler);
  const nationalRecharge = new NationalRecharge(requesterFactory, broker);
  const data = {
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const result = await nationalRecharge.execute("41b44ab9a56440.teste.celcoinapi.v5", data);
  expect(result).toHaveProperty("receipt");
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository).toHaveLength(1);
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository[0].document).toBe("46949827881");
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository[0].name).toBe("NationalRechargeConfirmed");
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository[0]).toHaveProperty("transactionId");
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository[0].value).toBe(15);
  expect(fakeNationalRechargeConfirmedHandler.fakeRepository[0].providerId).toBe(2086);
});
