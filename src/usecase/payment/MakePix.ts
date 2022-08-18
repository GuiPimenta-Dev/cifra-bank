import AuthDTO from "../../dto/application/AuthDTO";
import OutputDTO from "../../dto/application/OutputDTO";
import PaymentFacadeInterface from "../../domain/infra/baas/facade/PaymentFacade";
import MakePixDTO from "../../dto/usecase/MakePixDTO";

export default class MakePix {
  constructor(private paymentFacade: PaymentFacadeInterface) {}

  async execute(input: MakePixDTO, auth: AuthDTO): Promise<OutputDTO> {
    return await this.paymentFacade.makePix(input, auth);
  }
}
