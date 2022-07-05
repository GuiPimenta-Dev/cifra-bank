// import "dotenv";
import TokenDTO from "../../../src/application/dto/TokenDTO";
import ConsultAccountData from "../../../src/application/usecase/ConsultAccountData";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import FakeConsultAccountDataHttpClient from "../fake/httpclient/FakeConsultAccountDataHttpClient";
import getToken from "../utils/getToken";

let token: TokenDTO;
beforeAll(async () => {
  token = await getToken();
});
test("It should be able to consult an account data", async () => {
  const httpClient = new FakeConsultAccountDataHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const consultAccountData = new ConsultAccountData(baasFactory);
  const response = await consultAccountData.execute(1, "846700000009775501090119004723678639901264282574", token);
  expect(response).toHaveProperty("transactionId");
  expect(response.value).toBe(77.55);
});
