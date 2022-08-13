import AuthDTO from "../../../domain/dto/application/AuthDTO";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import PaymentFacadeInterface from "../../../domain/infra/baas/facade/PaymentFacade";

export default class ConsultBalance {
  constructor(private paymentFacade: PaymentFacadeInterface) {}

  async execute(bank: string, agency: string, originAccount: string, token: AuthDTO): Promise<OutputDTO> {
    return await this.paymentFacade.consultBalance(bank, agency, originAccount, token);
  }
}
