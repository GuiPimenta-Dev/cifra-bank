import JwtPayload from "../../../src/application/dto/JwtPayload";
import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";

let jwtPayload: JwtPayload;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});
test("Should be able to consult international recharge values", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const nationalRechargeValues = new ConsultInternationalRechargeValues(baasFactory);
  const response = await nationalRechargeValues.execute(jwtPayload, 509, 48227030);
  expect(response).toHaveProperty("data");
});
