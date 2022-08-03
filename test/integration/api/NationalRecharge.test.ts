import request from "supertest";
import app from "../../../src/infra/http/Router";
import { getToken } from "../../utils/Fixtures";

let authorization: string;
beforeEach(async () => {
  const token = await getToken();
  authorization = `Bearer ${token}`;
});

test.skip("It should be able to consult national providers", async () => {
  const { statusCode } = await request(app)
    .get("/national/providers")
    .query({
      stateCode: 11,
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});

test.skip("It should be able to consult national values", async () => {
  const { statusCode } = await request(app)
    .get("/national/values/2125")
    .query({
      stateCode: 11,
    })
    .set({ authorization });

  expect(statusCode).toBe(200);
});

test.skip("It should be able to make a national recharge", async () => {
  const { statusCode } = await request(app)
    .post("/national/recharge/2125")
    .send({
      value: 85.99,
      phone: {
        stateCode: 15,
        number: 993134307,
        countryCode: 55,
      },
    })
    .set({ authorization });
  expect(statusCode).toBe(200);
});
