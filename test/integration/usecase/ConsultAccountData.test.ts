import JwtPayloadDTO from "../../../src/application/dto/JwtPayloadDTO";
import ConsultAccountData from "../../../src/application/usecase/ConsultAccountData";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import decodeToken from "../../utils/decodeToken";
import FakeConsultAccountDataHttpClient from "../fake/httpclient/FakeConsultAccountDataHttpClient";

let jwtPayload: JwtPayloadDTO;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});

test("It should be able to consult an account data", async () => {
  const httpClient = new FakeConsultAccountDataHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const consultAccountData = new ConsultAccountData(baasFactory);
  const response = await consultAccountData.execute(jwtPayload, 1, "846700000009775501090119004723678639901264282574");
  expect(response).toHaveProperty("transactionId");
  expect(response.value).toBe(77.55);
});
