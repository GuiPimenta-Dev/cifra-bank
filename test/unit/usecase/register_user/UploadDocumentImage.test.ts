import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import UploadDocumentImage from "../../../../src/usecase/register_user/UploadDocumentImage";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";
test.skip("It should be able to upload document images", async () => {
  const fakeHttpClient = new FakeHttpClient();
  fakeHttpClient.mockGet({
    transaction_id: "12345",
  });
  fakeHttpClient.mockPost({
    success: true,
  });
  const baasFactory = new BaasFactory(fakeHttpClient);
  const registerUserFacade = baasFactory.createRegisterUserFacade();
  const uploadDocumentImage = new UploadDocumentImage(registerUserFacade);
  const input = {
    document: "15579226756",
    documentType: "RG",
    imageType: "front",
    file: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  };
  const { data } = await uploadDocumentImage.execute(input);
  expect(data.success).toBe(true);
});
