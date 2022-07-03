import ConsultNationalRechargeValues from "../../../src/application/usecase/ConsultNationalRechargeValues";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});
test("Should be able to consult national recharge values", async () => {
  const nationalRechargeValues = new ConsultNationalRechargeValues(baasFacade);
  const response = await nationalRechargeValues.execute(11, 2125);
  expect(response).toHaveProperty("values");
});
