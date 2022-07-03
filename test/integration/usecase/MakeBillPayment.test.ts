import MakeBillPayment from "../../../src/application/usecase/MakeBillPayment";
import Broker from "../../../src/infra/broker/Broker";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import FakeMakeBillPaylmentHandler from "../fake/handler/FakeMakeBillPaymentHandler";
import FakeMakeBillPaymentHttpClient from "../fake/httpclient/FakeMakeBillPaymentHttpClient";

import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let cellcoinFacade: BaasFacadeInterface;

beforeAll(async () => {
  cellcoinFacade = await createCellcoinFacade();
});

test("It should be able to make a bill payment", async () => {
  const httpClient = new FakeMakeBillPaymentHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const baasFacade = baasFactory.createCellcoinFacade();
  baasFacade.token = cellcoinFacade.token;
  const broker = new Broker();
  const fakeMakeBillPaymentHandler = new FakeMakeBillPaylmentHandler();
  broker.register(fakeMakeBillPaymentHandler);
  const makeBillPayment = new MakeBillPayment(baasFacade, broker);
  const data = {
    document: "51680002000100",
    billData: {
      value: 77.55,
      originalValue: 77.55,
    },
    barCode: {
      type: 1,
      digitable: "846700000009775501090119004723678639901264282574",
    },
    dueDate: "07/07/2022",
    transactionId: 816318661,
  };
  const response = await makeBillPayment.execute(data);
  expect(response).toHaveProperty("receipt");
  expect(fakeMakeBillPaymentHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeBillPaymentHandler.fakeRepository[0].document).toBe("51680002000100");
  expect(fakeMakeBillPaymentHandler.fakeRepository[0].name).toBe("BillPaymentMade");
  expect(fakeMakeBillPaymentHandler.fakeRepository[0]).toHaveProperty("transactionId");
});
