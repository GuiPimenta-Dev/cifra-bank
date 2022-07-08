// import "dotenv";
import ConsultBill from "../../../../src/application/usecase/bill/ConsultBill";
import AuthDTO from "../../../../src/domain/dto/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeConsultAccountDataHttpClient from "../../utils/fake/httpclient/FakeConsultAccountDataHttpClient";
import { getAuth } from "../../utils/fixtures";

let auth: AuthDTO;
beforeAll(async () => {
  auth = await getAuth();
});
test("It should be able to consult an account data", async () => {
  const httpClient = new FakeConsultAccountDataHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const billFacade = baasFactory.createBillFacade();
  const consultBill = new ConsultBill(billFacade);
  const { data } = await consultBill.execute(1, "846700000009775501090119004723678639901264282574", auth);
  expect(data).toHaveProperty("transactionId");
  expect(data.value).toBe(77.55);
});
