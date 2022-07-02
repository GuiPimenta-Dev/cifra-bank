import JwtPayload from "../../../src/application/dto/JwtPayload";
import MakeInternationalRecharge from "../../../src/application/usecase/MakeInternationalRecharge";
import Broker from "../../../src/infra/broker/Broker";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";
import decodeToken from "../../utils/decodeToken";
import FakeMakeInternationalRechargeHandler from "../fake/FakeMakeInternationalRechargeHandler";

let jwtPayload: JwtPayload;

beforeAll(async () => {
  jwtPayload = await decodeToken();
});
test("Should be able to make an international recharge", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const broker = new Broker();
  const fakeMakeInternationalRechargeHandler = new FakeMakeInternationalRechargeHandler();
  broker.register(fakeMakeInternationalRechargeHandler);
  const makeInternationalRecharge = new MakeInternationalRecharge(baasFactory, broker);
  const data = {
    document: "35914746817",
    value: 5.43,
    productId: 5,
    phone: { countryCode: 509, number: 48227030 },
  };
  const result = await makeInternationalRecharge.execute(jwtPayload, data);
  expect(result).toHaveProperty("receipt");
  expect(fakeMakeInternationalRechargeHandler.fakeRepository).toHaveLength(1);
  expect(fakeMakeInternationalRechargeHandler.fakeRepository[0].document).toBe("35914746817");
  expect(fakeMakeInternationalRechargeHandler.fakeRepository[0].name).toBe("InternationalRechargeMade");
  expect(fakeMakeInternationalRechargeHandler.fakeRepository[0]).toHaveProperty("transactionId");
  expect(fakeMakeInternationalRechargeHandler.fakeRepository[0].value).toBe(5.43);
  expect(fakeMakeInternationalRechargeHandler.fakeRepository[0].productId).toBe(5);
});
