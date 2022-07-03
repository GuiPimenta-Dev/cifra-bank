import ConsultNationalProviders from "../../../src/application/usecase/ConsultNationalProviders";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});

test("It should be able to consult providers", async () => {
  const consultNationalProviders = new ConsultNationalProviders(baasFacade);
  const response = await consultNationalProviders.execute(13);
  expect(response).toHaveProperty("providers");
});
