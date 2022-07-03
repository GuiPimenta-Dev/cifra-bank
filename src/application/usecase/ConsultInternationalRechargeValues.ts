import UseCaseInterface from "../../domain/application/UseCase";
import InternationalPhone from "../../domain/entity/InternationalPhone";
import BaasFacadeInterface from "../../domain/facade/BaasFacade";

export default class ConsultInternationalRechargeValues implements UseCaseInterface {
  constructor(readonly baasFacade: BaasFacadeInterface) {}

  async execute(countryCode: number, number: number): Promise<any> {
    const { value: phone } = new InternationalPhone(countryCode, number);
    return await this.baasFacade.consultInternationalRechargeValues(phone.countryCode, phone.number);
  }
}
