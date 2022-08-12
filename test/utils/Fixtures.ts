import Authorize from "../../src/application/usecase/authorize/Authorize";
import AuthDTO from "../../src/domain/dto/application/AuthDTO";
import BaasFactory from "../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../src/infra/http/adapter/AxiosAdapter";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const authorizeFacade = baasFactory.createAuthorizeFacade();
const authorize = new Authorize(authorizeFacade);

export async function getToken(): Promise<string> {
  const { data } = await authorize.execute(
    "41b44ab9a56440.teste.celcoinapi.v5",
    "02978867035",
    "f059fdb3-8d14-35b5-b78f-e32df6aed86c",
    "dbfd9dee-e943-31e8-9508-bad621da3901"
  );
  return data.token;
}

export function fakeAuth(): AuthDTO {
  return {
    document: "35914746817",
    celcoinToken: "fake-token",
    arbiToken: "fake-token",
  };
}
