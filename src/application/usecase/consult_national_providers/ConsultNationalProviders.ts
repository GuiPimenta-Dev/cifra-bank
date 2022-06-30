import BaasFacade from "../../../domain/facade/BaasFacade";

export default class ConsultNationalProviders {
  constructor(readonly baasFacade: BaasFacade) {}

  async execute(id: string, stateCode: number): Promise<any> {
    return this.baasFacade.consultNationalProviders(id, stateCode);
  }
}
