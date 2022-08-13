import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import ConsultBalance from "../../../../src/usecase/payment/ConsultBalance";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("it should be able to check the balance", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost([
    {
      idmodulo: 1,
      idtransacao: 3,
      idrequisicaoarbi: "20220812668162@3013087022041",
      idrequisicaoparceiro: "6661c940-32a7-4448-99a1-2452429cd254",
      idstatus: 201,
      descricaostatus: "Sucesso",
      resultado: "3000.00",
    },
  ]);
  const baasFactory = new BaasFactory(httpClient);
  const paymentFacade = baasFactory.createPaymentFacade();
  const consultBalance = new ConsultBalance(paymentFacade);
  const { data } = await consultBalance.execute("213", "00019", "7140020700", fakeAuth());
  expect(data).toHaveProperty("balance");
});
