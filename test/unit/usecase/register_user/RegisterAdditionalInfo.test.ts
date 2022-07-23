import RegisterAdditionalInfo from "../../../../src/application/usecase/register_user/RegisterAdditionalInfo";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("it should be able to register additional info", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUser = baasFactory.createRegisterUserFacade();
  const registerAdditionalInfo = new RegisterAdditionalInfo(registerUser);
  const input = {
    document: "15579226756",
    maritalStatus: 0,
    motherName: "Sonia Leal Alves Pimenta",
    gender: "M",
    birthDate: "1996-04-24",
    nationalityState: "RJ",
    nationality: "BRASIL",
    documentInfo: {
      type: "RG",
      number: "284315694",
      state: "RJ",
    },
  };
  const { data } = await registerAdditionalInfo.execute(input);
  expect(data.success).toBe(true);
});
