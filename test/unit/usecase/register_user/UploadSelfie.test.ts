import UploadSelfie from "../../../../src/application/usecase/register_user/UploadSelfie";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test.skip("It should be able to upload a signature", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const uploadSignature = new UploadSelfie(registerUserFacade);
  const file = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
  const { data } = await uploadSignature.execute("15579226756", file);
  expect(data.success).toBe(true);
});
