import MakeNationalRecharge from "../../../src/application/usecase/MakeNationalRecharge";
import Broker from "../../../src/infra/broker/Broker";
import FakeMakeNationalRechargeHandler from "../fake/handler/FakeMakeNationalRechargeHandler";

import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});
test("Should be able to make a national recharge", async () => {
  const broker = new Broker();
  const fakeMakeNationalRechargeHandler = new FakeMakeNationalRechargeHandler();
  broker.register(fakeMakeNationalRechargeHandler);
  const makeNationalRecharge = new MakeNationalRecharge(baasFacade, broker);
  const data = {
    document: "46949827881",
    value: 15,
    providerId: 2086,
    phone: { stateCode: 11, countryCode: 55, number: 999999999 },
  };
  const response = await makeNationalRecharge.execute(data);
  expect(response).toHaveProperty("receipt");
  expect(fakeMakeNationalRechargeHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].document).toBe("46949827881");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].name).toBe("NationalRechargeMade");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0]).toHaveProperty("transactionId");
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].value).toBe(15);
  expect(fakeMakeNationalRechargeHandler.fakeRepository[0].providerId).toBe(2086);
});
