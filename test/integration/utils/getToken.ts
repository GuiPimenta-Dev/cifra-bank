import jwt from "jsonwebtoken";
import env from "../../../env";
import TokenDTO from "../../../src/application/dto/TokenDTO";
import Authorize from "../../../src/application/usecase/Authorize";
import BaasFactory from "../../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../../src/infra/http/adapter/AxiosAdapter";

export default async (): Promise<TokenDTO> => {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorize = new Authorize(baasFactory);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5");
  return jwt.verify(data.token, env.JWT_SECRET) as TokenDTO;
};
