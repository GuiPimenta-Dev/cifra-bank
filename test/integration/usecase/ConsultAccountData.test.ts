import ConsultAccountData from "../../../src/application/usecase/ConsultAccountData";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import BaasFactory from "../../../src/infra/factory/BaasFactory";
import { createCellcoinFacade } from "../../utils/createFacade";
import FakeConsultAccountDataHttpClient from "../fake/httpclient/FakeConsultAccountDataHttpClient";

let cellcoinFacade: BaasFacadeInterface;

beforeAll(async () => {
  cellcoinFacade = await createCellcoinFacade();
});

test("It should be able to consult an account data", async () => {
  const httpClient = new FakeConsultAccountDataHttpClient();
  const baasFactory = new BaasFactory(httpClient);
  const baasFacade = baasFactory.createCellcoinFacade();
  baasFacade.token = cellcoinFacade.token;
  const consultAccountData = new ConsultAccountData(baasFacade);
  const response = await consultAccountData.execute(1, "846700000009775501090119004723678639901264282574");
  expect(response).toHaveProperty("transactionId");
  expect(response.value).toBe(77.55);
});
