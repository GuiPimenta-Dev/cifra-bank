import AuthDTO from "../../../domain/dto/AuthDTO";
import MakeInternationalRechargeDTO from "../../../domain/dto/MakeInternationalRechargeDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import InternationalPhone from "../../../domain/entity/InternationalPhone";
import InternationalRechargeMade from "../../../domain/event/InternationalRechargeMade";
import InternationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/InternationalRechargeFacade";
import BrokerInterface from "../../../domain/infra/broker/Broker";

export default class MakeInternationalRecharge {
  constructor(private internationalRecharge: InternationalRechargeFacadeInterface, private broker: BrokerInterface) {}

  async execute(input: MakeInternationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value, productId, phone } = input;
    new InternationalPhone(phone.countryCode, phone.number);
    const makeInternationalRechargeDTO = { value, document: auth.document, productId, phone };
    const { statusCode, data } = await this.internationalRecharge.makeInternationalRecharge(
      makeInternationalRechargeDTO,
      auth
    );
    this.broker.publish(new InternationalRechargeMade(auth.document, data.transactionId, value, productId));
    return { statusCode, data };
  }
}
