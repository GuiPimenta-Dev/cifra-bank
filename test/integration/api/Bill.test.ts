import request from "supertest";
import app from "../../../src/infra/http/Router";
import { getToken } from "../../utils/Fixtures";

let authorization: string;
beforeEach(async () => {
  const token = await getToken();
  authorization = `Bearer ${token}`;
});

test.skip("It should be able to consult a bill", async () => {
  const { statusCode } = await request(app)
    .get("/bills/848900000002776303791513211590704018479055745822")
    .query({ type: 1 })
    .set({ authorization });
  expect([200, 400]).toContain(statusCode);
});

test.skip("It should be able to pay a bill", async () => {
  const { statusCode } = await request(app)
    .post("/bills/848900000002776303791513211590704018479055745822")
    .send({
      billData: {
        value: 77.63,
        originalValue: 0,
      },
      barCode: {
        type: 1,
      },
      dueDate: "07/07/2022",
      transactionId: 816335151,
    })
    .set({ authorization });
  expect([200, 400]).toContain(statusCode);
});
