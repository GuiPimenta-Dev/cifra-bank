import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import ConsultProviderRequester from "../../../infra/requester/ConsultNationalProviderRequester";

export default class ConsultNationalProviders {
  requester: ConsultProviderRequester;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createConsultProviderRequester();
  }

  async execute(cpf: string, stateCode: number): Promise<any> {
    const token = await this.requester.authorize(cpf);
    const { providers } = await this.requester.consultNationalProviders(stateCode, token);
    return { providers };
  }
}
