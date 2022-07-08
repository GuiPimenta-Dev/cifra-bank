import jwt from "jsonwebtoken";
import env from "../../../../env";
import Authorize from "../../../../src/application/usecase/authorize/Authorize";
import AuthDTO from "../../../../src/domain/dto/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../../src/infra/http/adapter/AxiosAdapter";

test("It should be able to authorize Celcoin", async () => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorizeFacade = baasFactory.createAuthorizeFacade();
  const authorize = new Authorize(authorizeFacade);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "46949827881");
  expect(data).toHaveProperty("token");
  const decodedToken = jwt.verify(data.token, env.JWT_SECRET) as AuthDTO;
  expect(typeof decodedToken).toBe("object");
  expect(decodedToken.document).toBe("46949827881");
  expect(decodedToken.celcoinToken).toBeDefined();
});
