import UploadSignature from "../../../../src/application/usecase/register_user/UploadSignature";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to upload a signature", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const uploadSignature = new UploadSignature(registerUserFacade);
  const file = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
  const { data } = await uploadSignature.execute("15579226756", file, "signature_file");
  expect(data.success).toBe(true);
});
