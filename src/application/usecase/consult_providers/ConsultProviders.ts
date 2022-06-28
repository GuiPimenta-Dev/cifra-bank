import RequesterFactoryInterface from "../../../domain/factory/RequesterFactory";
import ConsultProviderRequester from "../../../infra/requester/ConsultProviderRequester";

export default class ConsultProviders {
  requester: ConsultProviderRequester;

  constructor(requesterFactory: RequesterFactoryInterface) {
    this.requester = requesterFactory.createConsultProviderRequester();
  }

  async execute(cpf: string, stateCode: number): Promise<any> {
    const token = await this.requester.authorize(cpf);
    const { providers } = await this.requester.consultProviders(stateCode, token);
    return { providers };
  }
}
