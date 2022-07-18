import request from "supertest";
import app from "../../../src/infra/http/Router";
import { getToken } from "../../utils/Fixtures";

let authorization: string;
beforeEach(async () => {
  const token = await getToken();
  authorization = `Bearer ${token}`;
});

test("It should be able to consult national providers", async () => {
  const { statusCode } = await request(app)
    .get("/national/providers")
    .query({
      stateCode: 13,
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});

test("It should be able to consult national values", async () => {
  const { statusCode } = await request(app)
    .get("/national/values")
    .query({
      stateCode: 11,
      providerId: 2125,
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});

test("It should be able to make a national recharge", async () => {
  const { statusCode } = await request(app)
    .post("/national/recharge")
    .send({
      value: 85.99,
      providerId: 2125,
      phone: {
        stateCode: 15,
        number: 993134307,
        countryCode: 55,
      },
    })
    .set({ authorization });
  expect(statusCode).toBe(200);
});
