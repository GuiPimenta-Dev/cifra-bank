import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";

test("It should be able to consult the extract", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockPost([
    {
      idmodulo: 1,
      idtransacao: 4,
      idrequisicaoarbi: "20220813668005@8117433753977",
      idrequisicaoparceiro: "6324d80e-f72f-4bde-8102-29511b9f59ad",
      idstatus: 201,
      descricaostatus: "Sucesso",
      resultado:
        '{"datamovimento":"12/08/2022","conta":"7140020700","natureza":"D","historico":"00155-TED - REMESSA IP","nromovimento":"902034418","valor":"5.00","inscricaocontraparte":"42795771020","nomecontraparte":"Xpto","finalidade":"001 00019 0000000000002 Xpto","evento":"STR0008","sisorigem":"APISC","codhist":"00155","nrodocto":"2110397"}',
    },
  ]);
  const baasFactory = new BaasFactory(httpClient);
  const paymentFacade = baasFactory.createPaymentFacade();
  const payment = new ConsultExtract(paymentFacade);
  const body = {
    bank: "213",
    agency: "00019",
    contaorigem: "7140020700",
    tipocontadebitada: "CC",
    datainicial: "2022-08-12",
    datafinal: "2022-08-12",
  };
  const { data } = await payment.execute(body, fakeAuth());
  expect(data).toHaveLength(1);
});
