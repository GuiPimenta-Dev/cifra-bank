import JwtPayload from "../../../src/application/dto/JwtPayload";
import ConsultAccountData from "../../../src/application/usecase/ConsultAccountData";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";

let jwtPayload: JwtPayload;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});

test("It should be able to consult an account data", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultAccountData = new ConsultAccountData(baasFactory);
  const response = await consultAccountData.execute(jwtPayload, 1, "846700000009775501090119004723678639901264282574");
  expect(response.transactionId).toBeTruthy();
  expect(response.value).toBe(77.55);
});
