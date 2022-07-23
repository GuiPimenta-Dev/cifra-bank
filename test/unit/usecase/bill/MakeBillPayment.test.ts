import MakeBillPayment from "../../../../src/application/usecase/bill/MakeBillPayment";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import Broker from "../../../../src/infra/broker/Broker";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHandler from "../../../utils/mocks/broker/FakeHandler";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to make a bill payment", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost({ receipt: "fake-receipt", transactionId: 123456789 });
  const baasFactory = new BaasFactory(httpClient);
  const billFacade = baasFactory.createBillFacade();
  const broker = new Broker();
  const fakeHandler = new FakeHandler("BillPaymentMade");
  broker.register(fakeHandler);
  const makeBillPayment = new MakeBillPayment(billFacade, broker);
  const body = {
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
  const { data } = await makeBillPayment.execute(body, fakeAuth());
  expect(data).toHaveProperty("receipt");
  expect(fakeHandler.fakeRepository).toHaveLength(1);
  expect(fakeHandler.fakeRepository[0].document).toBe("35914746817");
  expect(fakeHandler.fakeRepository[0].name).toBe("BillPaymentMade");
  expect(fakeHandler.fakeRepository[0].transactionId).toBe(123456789);
});
