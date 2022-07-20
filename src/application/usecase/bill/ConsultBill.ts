import AuthDTO from "../../../domain/dto/AuthDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import BillFacadeInterface from "../../../domain/infra/baas/facade/BillFacade";

export default class ConsultBill {
  constructor(private billFacade: BillFacadeInterface) {}

  async execute(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO> {
    return await this.billFacade.consultBill(type, digitable, auth);
  }
}
