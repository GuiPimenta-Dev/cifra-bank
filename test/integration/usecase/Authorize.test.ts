import jwt from "jsonwebtoken";
import env from "../../../env";
import TokenDTO from "../../../src/application/dto/TokenDTO";
import Authorize from "../../../src/application/usecase/Authorize";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

test("It should be able to authorize Cellcoin", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorize = new Authorize(baasFactory);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5");
  expect(data.token).toBeDefined();
  const decodedToken = jwt.verify(data.token, env.JWT_SECRET) as TokenDTO;
  expect(typeof decodedToken).toBe("object");
  expect(decodedToken.cellcoinToken).toBeDefined();
});
