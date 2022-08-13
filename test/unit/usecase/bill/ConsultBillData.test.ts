// import "dotenv";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import ConsultBill from "../../../../src/usecase/bill/ConsultBill";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to consult an account data", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost({ value: 77.55, transactionId: 123456789 });
  const baasFactory = new BaasFactory(httpClient);
  const billFacade = baasFactory.createBillFacade();
  const consultBill = new ConsultBill(billFacade);
  const { data } = await consultBill.execute(1, "846700000009775501090119004723678639901264282574", fakeAuth());
  expect(data).toHaveProperty("transactionId");
  expect(data.value).toBe(77.55);
});
