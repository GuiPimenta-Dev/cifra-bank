import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import AcceptTerm from "../../../../src/usecase/register_user/AcceptTerm";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test.skip("It should be able to consult terms", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const acceptTerm = new AcceptTerm(registerUserFacade);
  const { data } = await acceptTerm.execute("15579226756", "declaracao-generica", "123456");
  expect(data.success).toBe(true);
});
