import request from "supertest";
import app from "../../../src/infra/http/Router";
test("It should be able to get token", async () => {
  const { statusCode } = await request(app)
    .post("/authorize")
    .send({ id: "41b44ab9a56440.teste.celcoinapi.v5", document: "35914746817" });
  expect(statusCode).toBe(200);
});
