import jwt from "jsonwebtoken";
import Authorize from "../../../../src/application/usecase/authorize/Authorize";
import AuthDTO from "../../../../src/domain/dto/application/AuthDTO";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to authorize Celcoin", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost({
    redirect_uri: "http://localhost/?code=4f02af24-192e-4f6b-a494-9b15602cccbd",
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI0MWI0NGFiOWE1NjQ0MC50ZXN0ZS5jZWxjb2luYXBpLnY1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6ImQyZTRjOTYxYjQ0MTRlNjI4YjdmIiwiZXhwIjoxNjU4MTA2NDgyLCJpc3MiOiJDZWxjb2luQVBJIiwiYXVkIjoiQ2VsY29pbkFQSSJ9.e-FbFu4Ns4oE4tACx40xDELp17JGBO-RkiNK8urW40Q",
    expires_in: 2400,
    token_type: "bearer",
  });
  const baasFactory = new BaasFactory(httpClient);
  const authorizeFacade = baasFactory.createAuthorizeFacade();
  const authorize = new Authorize(authorizeFacade);
  const { data } = await authorize.execute("41b44ab9a56440.teste.celcoinapi.v5", "46949827881", "username", "password");
  expect(data).toHaveProperty("token");
  const decodedToken = jwt.verify(data.token, process.env.JWT_SECRET as string) as AuthDTO;
  expect(typeof decodedToken).toBe("object");
  expect(decodedToken.document).toBe("46949827881");
  expect(decodedToken.celcoinToken).toBeDefined();
  expect(decodedToken.arbiToken).toBeDefined();
});
