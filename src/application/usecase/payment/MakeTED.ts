import AuthDTO from "../../../domain/dto/application/AuthDTO";
import OutputDTO from "../../../domain/dto/application/OutputDTO";
import MakeTEDDTO from "../../../domain/dto/usecase/MakeTEDDTO";
import PaymentFacadeInterface from "../../../domain/infra/baas/facade/PaymentFacade";

export default class MakeTED {
  constructor(private paymentFacade: PaymentFacadeInterface) {}

  async execute(input: MakeTEDDTO, auth: AuthDTO): Promise<OutputDTO> {
    return await this.paymentFacade.makeTED(input, auth);
  }
}
