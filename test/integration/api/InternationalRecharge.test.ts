import request from "supertest";
import app from "../../../src/infra/http/Router";
import { getToken } from "../../utils/Fixtures";

let authorization: string;
beforeEach(async () => {
  const token = await getToken();
  authorization = `Bearer ${token}`;
});

test.skip("It should be able to list available countries", async () => {
  const { statusCode } = await request(app).get("/international/countries").query({ page: 1 }).set({ authorization });
  expect(statusCode).toBe(200);
});

test.skip("It should be able to consult international values", async () => {
  const { statusCode } = await request(app)
    .get("/international/values")
    .query({
      countryCode: 509,
      phoneNumber: 48227030,
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});

test.skip("It should be able to make a international recharge", async () => {
  const { statusCode } = await request(app)
    .post("/international/recharge/5")
    .send({
      value: 85.99,
      phone: {
        number: 48227030,
        countryCode: 509,
      },
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});
