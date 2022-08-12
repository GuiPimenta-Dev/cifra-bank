import ConsultTerm from "../../../../src/application/usecase/register_user/ConsultTerm";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
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
  const consultTerm = new ConsultTerm(registerUserFacade);
  const { data } = await consultTerm.execute("15579226756", "declaracao-generica");
  expect(data.success).toBe(true);
});
