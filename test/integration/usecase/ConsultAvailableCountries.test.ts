import JwtPayloadDTO from "../../../src/application/dto/JwtPayloadDTO";
import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";

let jwtPayload: JwtPayloadDTO;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});

test("It Should be able to consult all available countries", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const consultAvailableCountries = new ConsultAvailableCountries(baasFactory);
  const response = await consultAvailableCountries.execute(jwtPayload, 1);
  expect(response).toHaveProperty("countries");
});
