import MakeTED from "../../../../src/application/usecase/payment/MakeTED";
import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("it should be able to make a TED transfer", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost([
    {
      idmodulo: 1,
      idtransacao: 2,
      idrequisicaoarbi: "20220812668234@3163965854531",
      idrequisicaoparceiro: "17f7aeb1-5b88-4bc5-b3f0-6629cb9b47b4",
      idstatus: 201,
      descricaostatus: "Sucesso",
      resultado: "STR20220812002110393",
    },
  ]);
  const baasFactory = new BaasFactory(httpClient);
  const paymentFacade = baasFactory.createPaymentFacade();
  const makeTED = new MakeTED(paymentFacade);
  const body = {
    originbank: "213",
    originAgency: "00019",
    originAccount: "7140020700",
    typeOriginAccount: "CC",
    targetBank: "001",
    targetAgency: "00019",
    targetAccount: "0002",
    typeTargetAccount: "CC",
    targetClientDocument: "42795771020",
    targetClientName: "Xpto",
    targetClientType: "F",
    value: "5",
  };
  const { data } = await makeTED.execute(body, fakeAuth());
  expect(data.message).toEqual("TED created successfully");
});
