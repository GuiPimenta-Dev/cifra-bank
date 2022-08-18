import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import PaymentFacadeInterface from "../../domain/infra/baas/facade/PaymentFacade";

export default class ConsultBalance {
  constructor(private paymentFacade: PaymentFacadeInterface) {}

  async execute(bank: string, agency: string, payerAccount: string, token: AuthDTO): Promise<OutputDTO> {
    return await this.paymentFacade.consultBalance(bank, agency, payerAccount, token);
  }
}
