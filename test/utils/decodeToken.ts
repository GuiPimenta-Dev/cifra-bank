import jwt from "jsonwebtoken";
import env from "../../env";
import JwtPayload from "../../src/application/dto/JwtPayload";
import Authorize from "../../src/application/usecase/Authorize";
import BaasFactory from "../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";

export default async function decodeToken() {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const authorize = new Authorize(baasFactory);
  const response = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5");
  return jwt.verify(response.token, env.JWT_SECRET) as JwtPayload;
}
