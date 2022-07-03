import ConsultInternationalRechargeValues from "../../../src/application/usecase/ConsultInternationalRechargeValues";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});

test("Should be able to consult international recharge values", async () => {
  const nationalRechargeValues = new ConsultInternationalRechargeValues(baasFacade);
  const response = await nationalRechargeValues.execute(509, 48227030);
  expect(response).toHaveProperty("data");
});
