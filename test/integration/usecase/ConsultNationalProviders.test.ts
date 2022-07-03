import JwtPayloadDTO from "../../../src/application/dto/JwtPayloadDTO";
import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";

let jwtPayload: JwtPayloadDTO;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});
test("It should be able to consult providers", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultNationalProviders = new ConsultNationalProviders(baasFactory);
  const response = await consultNationalProviders.execute(jwtPayload, 13);
  expect(response).toHaveProperty("providers");
});
