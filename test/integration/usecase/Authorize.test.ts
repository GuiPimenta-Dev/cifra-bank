import jwt from "jsonwebtoken";
import env from "../../../env";
import JwtPayloadDTO from "../../../src/application/dto/JwtPayloadDTO";
import Authorize from "../../../src/application/usecase/Authorize";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/AxiosAdapter";

test("It should be able to authorize Cellcoin", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorize = new Authorize(baasFactory);
  const response = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5");
  expect(response.token).toBeDefined();
  const decodedToken = jwt.verify(response.token, env.JWT_SECRET) as JwtPayloadDTO;
  expect(typeof decodedToken).toBe("object");
  expect(decodedToken.cellcoinToken).toBeDefined();
  expect(decodedToken.iat).toBeDefined();
  expect(decodedToken.exp).toBeDefined();
});
