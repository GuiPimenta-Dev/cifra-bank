import AuthDTO from "../../../domain/dto/AuthDTO";
import MakeNationalRechargeDTO from "../../../domain/dto/MakeNationalRechargeDTO";
import OutputDTO from "../../../domain/dto/OutputDTO";
import Document from "../../../domain/entity/Document";
import NationalPhone from "../../../domain/entity/NationalPhone";
import NationalRechargeMade from "../../../domain/event/NationalRechargeMade";
import NationalRechargeFacadeInterface from "../../../domain/infra/baas/facade/NationalRechargeFacade";
import BrokerInterface from "../../../domain/infra/broker/Broker";

export default class NationalRecharge {
  constructor(private nationalRecharge: NationalRechargeFacadeInterface, private broker: BrokerInterface) {}

  async execute(input: MakeNationalRechargeDTO, auth: AuthDTO): Promise<OutputDTO> {
    const { value, providerId, phone } = input;
    new NationalPhone(phone.countryCode, phone.stateCode, phone.number);
    const document = new Document(auth.document).getDocument();
    const makeNationalRechargeDTO = { value, document, providerId, phone };
    const { statusCode, data } = await this.nationalRecharge.makeNationalRecharge(makeNationalRechargeDTO, auth);
    this.broker.publish(new NationalRechargeMade(document, data.transactionId, value, providerId));
    return { statusCode, data };
  }
}
