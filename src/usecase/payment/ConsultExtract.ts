import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import ConsultExtractDTO from "../../dto/usecase/ConsultExtractDTO";
import PaymentFacadeInterface from "../../domain/infra/baas/facade/PaymentFacade";

export default class ConsultExtract {
  constructor(private paymentFacade: PaymentFacadeInterface) {}

  async execute(input: ConsultExtractDTO, auth: AuthDTO): Promise<OutputDTO> {
    return await this.paymentFacade.consultExtract(input, auth);
  }
}
