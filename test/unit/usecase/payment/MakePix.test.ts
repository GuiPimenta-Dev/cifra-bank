import BaasFactory from "../../../../src/infra/baas/BaasFactory";
import { fakeAuth } from "../../../utils/Fixtures";
import FakeHttpClient from "../../../utils/mocks/httpclient/FakeHttpClient";
import MakePix from "../../../../src/usecase/payment/MakePix";

test("It should be able to make a pix payment", async () => {
  const httpClient = new FakeHttpClient();
  httpClient.mockGet([
    {
      status: 200,
      response:
        '{"agencia":"0001","conta":"7140020645","cpfCnpj":"54403563000150","instituicao":"54403563","tipoConta":"CACC","confirmado":true,"cid":"f02d5d4ddb3413ab17d4934690c26772c19ed809ca655e18a3d254ec2c940205","nome":"Jose","tipoPessoa":"LEGAL_PERSON","chave":"+5516981767414","tipoChave":"PHONE","dataCriacao":"2022-08-15T18:55:39.337Z","dataPosse":"2022-08-15T18:55:39.337Z","nomeFantasia":"Nome fantasia","endToEnd":"E54403563202208172315WFG0KPm92S8","nomePsp":"BCO ARBI S.A.","dataAbertura":"2022-08-15T03:00:00Z","campoExtra":"Campo Extra","estatisticas":{"accountSettlementsD3":0,"accountSettlementsD30":0,"accountSettlementsM6":0,"accountReportedFradusD3":0,"accountReportedFradusD30":0,"accountReportedFradusM6":0,"accountConfirmedFraudsD3":0,"accountConfirmedFraudsD30":0,"accountConfirmedFraudsM6":0,"accountRejectedD3":0,"accountRejectedD30":0,"accountRejectedM6":0,"keySettlementsD3":0,"keySettlementsD30":0,"keySettlementsM6":0,"keyReportedFradusD3":0,"keyReportedFradusD30":0,"keyReportedFradusM6":0,"keyConfirmedFraudsD3":0,"keyConfirmedFraudsD30":0,"keyConfirmedFraudsM6":0,"keyRejectedD3":0,"keyRejectedD30":0,"keyRejectedM6":0,"ownerSettlementsD3":0,"ownerSettlementsD30":0,"ownerSettlementsM6":0,"ownerReportedFradusD3":0,"ownerReportedFradusD30":0,"ownerReportedFradusM6":0,"ownerConfirmedFraudsD3":0,"ownerConfirmedFraudsD30":0,"ownerConfirmedFraudsM6":0,"ownerRejectedD3":0,"ownerRejectedD30":0,"ownerRejectedM6":0}}',
    },
  ]);
  httpClient.mockPost([
    {
      status: 202,
      response:
        '{"idOrdemPagamento":309561,"endToEnd":"E54403563202208172315WFG0KPm92S8","statusOrdemPagamento":"ENVIADA","infoOrdemPagamento":""}',
    },
  ]);
  const baasFactory = new BaasFactory(httpClient);
  const paymentFacade = baasFactory.createPaymentFacade();
  const makePIX = new MakePix(paymentFacade);
  const body = {
    payerBank: "54403563",
    payerAgency: "0001",
    payerAccount: "7140020734",
    payerAccountType: "CC",
    payerDocument: "39336198000114",
    value: 0.01,
    payerCode: "_autbank1",
    payerName: "Nome Pagador",
    text: "Informação ao recebedor",
    key: "+5516981767414",
  };
  const { data } = await makePIX.execute(body, fakeAuth());
  expect(data.orderId).toBe(309561);
  expect(data.transactionId).toBe("E54403563202208172315WFG0KPm92S8");
});
