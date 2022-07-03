import jwt from "jsonwebtoken";
import env from "../../../env";
import Authorize from "../../../src/application/usecase/Authorize";
import BaasFacadeInterface from "../../../src/domain/facade/BaasFacade";
import { createCellcoinFacade } from "../../utils/createFacade";

let baasFacade: BaasFacadeInterface;

beforeAll(async () => {
  baasFacade = await createCellcoinFacade();
});

export interface JwtPayloadDTO {
  iat: number;
  exp: number;
}
test("It should be able to authorize Cellcoin", async () => {
  const authorize = new Authorize(baasFacade);
  const response = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5");
  expect(response.token).toBeDefined();
  const decodedToken = jwt.verify(response.token, env.JWT_SECRET) as JwtPayloadDTO;
  expect(typeof decodedToken).toBe("object");
  expect(baasFacade.token).toBeDefined();
  expect(decodedToken.iat).toBeDefined();
  expect(decodedToken.exp).toBeDefined();
});
