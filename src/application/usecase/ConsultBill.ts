import BaasFacadeInterface from "../../domain/infra/baas/BaasFacade";
import BaasFactoryInterface from "../../domain/infra/baas/BaasFactory";
import AuthDTO from "../dto/AuthDTO";
import OutputDTO from "../dto/OutputDTO";

export default class ConsultBill {
  baasFacade: BaasFacadeInterface;

  constructor(baasFactory: BaasFactoryInterface) {
    this.baasFacade = baasFactory.createCellcoinFacade();
  }

  async execute(type: number, digitable: string, auth: AuthDTO): Promise<OutputDTO> {
    return this.baasFacade.consultBill(type, digitable, auth);
  }
}
