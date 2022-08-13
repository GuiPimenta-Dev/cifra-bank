import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import CreatePassword from "../../../../src/usecase/register_user/CreatePassword";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test.skip("It should be able to create a new password", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const createPassword = new CreatePassword(registerUserFacade);
  const { data } = await createPassword.execute("15579226756", "12345678G", "12345678G");
  expect(data.success).toBe(true);
});
