import Authorize from "../../src/application/usecase/authorize/Authorize";
import AuthDTO from "../../src/domain/dto/AuthDTO";
import BaasFactory from "../../src/infra/baas/BaasFactory";
import AxiosAdapter from "../../src/infra/http/adapter/AxiosAdapter";

const httpClient = new AxiosAdapter();
const baasFactory = new BaasFactory(httpClient);
const authorizeFacade = baasFactory.createAuthorizeFacade();
const authorize = new Authorize(authorizeFacade);

export async function getToken(): Promise<string> {
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "35914746817");
  return data.token;
}

export function fakeAuth(): AuthDTO {
  return {
    document: "35914746817",
    celcoinToken: "fake-token",
  };
}
