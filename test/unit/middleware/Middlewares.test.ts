import { verifyToken } from "../../../src/application/middleware/Middlewares";
import { getToken } from "../../utils/Fixtures";

test("must be able to verify token", async () => {
  const token = await getToken();
  const input = {
    query: {},
    body: {},
    headers: {
      authorization: `Bearer ${token}`,
      auth: {},
    },
    path: {},
  };
  verifyToken(input);
  expect(input.headers.auth).toHaveProperty("document");
  expect(input.headers.auth).toHaveProperty("celcoinToken");
});

test("must throw an error if there is no authorization header", async () => {
  const input = {
    query: {},
    body: {},
    headers: {},
    path: {},
  };
  expect(() => {
    return verifyToken(input);
  }).rejects.toThrowError("Authorization header is required");
});

test("must throw an error if there is no token in authorization header", async () => {
  const input = {
    query: {},
    body: {},
    headers: {
      authorization: "Bearer",
    },
    path: {},
  };
  expect(() => {
    return verifyToken(input);
  }).rejects.toThrowError("jwt token is required");
});

test("must throw an error if token is invalid", async () => {
  const input = {
    query: {},
    body: {},
    headers: {
      authorization: "Bearer 12345",
    },
    path: {},
  };
  expect(() => {
    return verifyToken(input);
  }).rejects.toThrow("Invalid token");
});
