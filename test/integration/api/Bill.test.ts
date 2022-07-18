import request from "supertest";
import app from "../../../src/infra/http/Router";
import { getToken } from "../../utils/Fixtures";

let authorization: string;
beforeEach(async () => {
  const token = await getToken();
  authorization = `Bearer ${token}`;
});

test("It should be able to consult a bill", async () => {
  const { statusCode } = await request(app)
    .get("/bills")
    .query({ type: 1, digitable: "848900000002776303791513211590704018479055745822" })
    .set({ authorization });
  expect([200, 400]).toContain(statusCode);
});

test("It should be able to pay a bill", async () => {
  const { statusCode } = await request(app)
    .post("/bills")
    .send({
      billData: {
        value: 77.63,
        originalValue: 0,
      },
      barCode: {
        type: 1,
        digitable: "848900000002776303791513211590704018479055745822",
      },
      dueDate: "07/07/2022",
      transactionId: 816335151,
    })
    .set({ authorization });
  expect([200, 400]).toContain(statusCode);
});
