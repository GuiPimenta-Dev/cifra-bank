import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import ConsultNationalProvidersRequesterInterface from "../../../domain/requester/ConsultNationalProvidersRequester";

export default class ConsultNationalProviders {
  requester: ConsultNationalProvidersRequesterInterface;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createConsultProviderRequester();
  }

  async execute(cpf: string, stateCode: number): Promise<any> {
    const token = await this.requester.authorize(cpf);
    const { providers } = await this.requester.consultNationalProviders(stateCode, token);
    return { providers };
  }
}
