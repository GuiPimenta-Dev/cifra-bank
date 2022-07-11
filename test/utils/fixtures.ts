import jwt from "jsonwebtoken";
import env from "../../env";
import Authorize from "../../src/application/usecase/authorize/Authorize";
import AuthDTO from "../../src/domain/dto/AuthDTO";
import BaasFactory from "../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../src/infra/http/adapter/AxiosAdapter";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const authorizeFacade = baasFactory.createAuthorizeFacade();
const authorize = new Authorize(authorizeFacade);

export async function getAuth(): Promise<AuthDTO> {
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "35914746817");
  return jwt.verify(data.token, env.JWT_SECRET) as AuthDTO;
}

export async function getToken(): Promise<string> {
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "35914746817");
  return data.token;
}
