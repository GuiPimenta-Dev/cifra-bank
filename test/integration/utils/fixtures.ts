import jwt from "jsonwebtoken";
import env from "../../../env";
import AuthDTO from "../../../src/application/dto/AuthDTO";
import Authorize from "../../../src/application/usecase/Authorize";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

export async function getAuth(): Promise<AuthDTO> {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorize = new Authorize(baasFactory);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "35914746817");
  return jwt.verify(data.token, env.JWT_SECRET) as AuthDTO;
}
