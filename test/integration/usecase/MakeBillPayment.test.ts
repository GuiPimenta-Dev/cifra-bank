import AuthDTO from "../../../src/application/dto/AuthDTO";
import MakeBillPayment from "../../../src/application/usecase/MakeBillPayment";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import Broker from "../../../src/infra/broker/Broker";
import FakeMakeBillPaylmentHandler from "../utils/fake/handler/FakeMakeBillPaymentHandler";
import FakeMakeBillPaymentHttpClient from "../utils/fake/httpclient/FakeMakeBillPaymentHttpClient";
import { getAuth } from "../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});

test("It should be able to make a bill payment", async () => {
  const httpClient = new FakeMakeBillPaymentHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const broker = new Broker();
  const fakeMakeBillPaymentHandler = new FakeMakeBillPaylmentHandler();
  broker.register(fakeMakeBillPaymentHandler);
  const makeBillPayment = new MakeBillPayment(baasFactory, broker);
  const body = {
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
  const { data } = await makeBillPayment.execute(body, auth);
  expect(data).toHaveProperty("receipt");
  expect(fakeMakeBillPaymentHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeBillPaymentHandler.fakeRepository[0].document).toBe("51680002000100");
  expect(fakeMakeBillPaymentHandler.fakeRepository[0].name).toBe("BillPaymentMade");
  expect(fakeMakeBillPaymentHandler.fakeRepository[0]).toHaveProperty("transactionId");
});
