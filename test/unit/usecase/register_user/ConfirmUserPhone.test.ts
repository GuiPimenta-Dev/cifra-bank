import ConfirmUserPhone from "../../../../src/application/usecase/register_user/ConfirmUserPhone";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to confirm a user phone", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPut({
    success: true,
    error_message: "",
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const confirmUserPhone = new ConfirmUserPhone(registerUserFacade);
  const input = {
    document: "15579226756",
    stateCode: 21,
    number: 964938805,
    code: "440808",
  };
  const { data } = await confirmUserPhone.execute(input);
  expect(data.success).toBe(true);
  expect(data.error_message).toBe("");
});
