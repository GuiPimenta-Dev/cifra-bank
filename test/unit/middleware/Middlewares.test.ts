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
    files: {},
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
    files: {},
  };
  expect(() => {
    verifyToken(input);
  }).toThrowError("Authorization header is required");
});

test("must throw an error if there is no token in authorization header", async () => {
  const input = {
    query: {},
    body: {},
    headers: {
      authorization: "Bearer",
    },
    path: {},
    files: {},
  };
  expect(() => {
    verifyToken(input);
  }).toThrowError("jwt token is required");
});

test("must throw an error if token is invalid", async () => {
  const input = {
    query: {},
    body: {},
    headers: {
      authorization: "Bearer 12345",
    },
    path: {},
    files: {},
  };
  expect(() => {
    verifyToken(input);
  }).toThrowError("Invalid token");
});
