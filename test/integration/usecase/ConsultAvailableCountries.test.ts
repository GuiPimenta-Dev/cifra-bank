import ConsultAvailableCountries from "../../../src/application/usecase/ConsultAvailableCountries";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});

test("It Should be able to consult all available countries", async () => {
  const consultAvailableCountries = new ConsultAvailableCountries(baasFacade);
  const response = await consultAvailableCountries.execute(1);
  expect(response).toHaveProperty("countries");
});
