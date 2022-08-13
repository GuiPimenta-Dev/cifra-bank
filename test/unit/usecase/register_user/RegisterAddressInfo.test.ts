import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import RegisterAddressInfo from "../../../../src/usecase/register_user/RegisterAddressInfo";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test.skip("It should be able to register address info", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const registerAddressInfo = new RegisterAddressInfo(registerUserFacade);
  const input = {
    document: "15579226756",
    postalCode: "85800-000",
    street: "Rua dos Bobos",
    number: "123",
    addressType: "1",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    monthlyProfit: "1000",
    issuingAgency: "DETRAN",
  };
  const { data } = await registerAddressInfo.execute(input);
  expect(data.success).toBe(true);
});
