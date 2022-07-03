import JwtPayloadDTO from "../../../src/application/dto/JwtPayloadDTO";
import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";

let jwtPayload: JwtPayloadDTO;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});
test("Should be able to consult national recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultNationalRechargeValues(baasFactory);
  const response = await nationalRechargeValues.execute(jwtPayload, 11, 2125);
  expect(response).toHaveProperty("values");
});
