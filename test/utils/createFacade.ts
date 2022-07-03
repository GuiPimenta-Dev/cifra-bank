import BaasFactory from "../../src/infra/factory/BaasFactory";
import AxiosAdapter from "../../src/infra/http/adapter/AxiosAdapter";

export async function createCellcoinFacade() {
  const httpClient = new AxiosAdapter();
  const baasFactory = new BaasFactory(httpClient);
  const baasFacade = baasFactory.createCellcoinFacade();
  await baasFacade.authorize("41b44ab9a56440.teste.celcoinapi.v5");
  return baasFacade;
}
