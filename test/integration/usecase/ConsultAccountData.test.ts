// import "dotenv";
import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultAccountData from "../../../src/application/usecase/ConsultAccountData";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import FakeConsultAccountDataHttpClient from "../utils/fake/httpclient/FakeConsultAccountDataHttpClient";
import { getToken } from "../utils/fixtures";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});
test("It should be able to consult an account data", async () => {
  const httpClient = new FakeConsultAccountDataHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const consultAccountData = new ConsultAccountData(baasFactory);
  const { data } = await consultAccountData.execute(1, "846700000009775501090119004723678639901264282574", token);
  expect(data).toHaveProperty("transactionId");
  expect(data.value).toBe(77.55);
});
