import RegisterUserInfo from "../../../../src/application/usecase/register_user/RegisterUserInfo";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test.skip("It should be able to register user info", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    status: "incomplete",
  });
  fakeHttpClient.mockPost({
    success: true,
    status: "incomplete",
    transactionId: "123456789",
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const registerUserInfo = new RegisterUserInfo(registerUserFacade);
  const body = {
    document: "46949827881",
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@gmail.com",
    phone: { stateCode: 11, number: 999999999 },
  };
  const { data } = await registerUserInfo.execute(body);
  expect(data.success).toBe(true);
  expect(data.status).toBe("incomplete");
});

test.skip("It should be throw an error if user is already registered", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    status: "complete",
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const registerUserInfo = new RegisterUserInfo(registerUserFacade);
  const body = {
    document: "46949827881",
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@gmail.com",
    phone: { stateCode: 11, number: 999999999 },
  };

  expect(async () => {
    await registerUserInfo.execute(body);
  }).rejects.toThrow("User already registered");
});
